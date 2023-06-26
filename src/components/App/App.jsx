import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Layout from '../Layout/Layout';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AuthProtectedRoute from '../AuthProtectedRoute/AuthProtectedRoute';

import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import authApi from '../../utils/AuthApi';
import moviesApi from '../../utils/MoviesApi';
import savedMoviesApi from '../../utils/SavedMoviesApi';
import userApi from '../../utils/UserApi';

import { configMoviesApi, shortFilm } from '../../utils/constants';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isResponseError, setIsResponseError] = useState(false);
  const [textResponse, setTextResponse] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(true);

  function closePreloader() {
    setIsPreloaderOpen(false);
  }

  function handleSubmitRegister({ name, email, password }) {
    setIsPreloaderOpen(true);
    authApi
      .signUp({ name, email, password })
      .then(() => {
        handleSubmitLogin({ email, password });
      })
      .catch((err) => {
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else if ((err.validation) && (err.validation.body.keys[0] === 'email')) {
          setTextResponse('Поле "E-mail" заполнено неправильно.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleSubmitLogin({ email, password }) {
    setIsPreloaderOpen(true);
    authApi
      .signIn({ email, password })
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        navigate('/movies')
      })
      .catch((err) => {
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else if ((err.validation) && (err.validation.body.keys[0] === 'email')) {
          setTextResponse('Поле "E-mail" заполнено неправильно.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleSubmitLogout() {
    setIsPreloaderOpen(true);
    authApi
      .signOut()
      .then((res) => {
        console.log(res);
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleSubmitPatchUser({ name, email }) {
    setIsPreloaderOpen(true);
    userApi
      .patchUser({ name, email })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else if ((err.validation) && (err.validation.body.keys[0] === 'email')) {
          setTextResponse('Поле "E-mail" заполнено неправильно.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleSubmitMovies({ movieValue, checked }) {
    setIsPreloaderOpen(true);
    localStorage.setItem('movieInputsValue', JSON.stringify({ movieValue, checked}));

    Promise.all([moviesApi.getMovies(), savedMoviesApi.getMovies()])
      .then(([moviesData, savedMoviesData]) => {
        const movies = [];
        moviesData.forEach((movie) => {
          if (movie.description.includes(movieValue) && (checked ? movie.duration <= shortFilm : true)) {

            const savedMovie = savedMoviesData.find((savedMovie) => savedMovie.movieId === movie.id)

            if (savedMovie) {
              movies.push({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: configMoviesApi.baseUrl + movie.image.url,
                trailerLink: movie.trailerLink,
                thumbnail: configMoviesApi.baseUrl + movie.image.formats.thumbnail.url,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                liked: savedMovie._id,
              })
            } else {
              movies.push({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: configMoviesApi.baseUrl + movie.image.url,
                trailerLink: movie.trailerLink,
                thumbnail: configMoviesApi.baseUrl + movie.image.formats.thumbnail.url,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                liked: false,
              })
            }
          }
        })

        localStorage.setItem('movies', JSON.stringify(movies));

        if (movies.length === 0) {
          setTextResponse('К сожалению, не найдено ни одного фильма, удовлетворяющего вашему запросу.');
          setTimeout(() => {
            setIsResponseError(false);
            setTextResponse('');
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleSubmitSavedMovies({ movieValue, checked }) {
    setIsPreloaderOpen(true);
    localStorage.setItem('savedMovieInputsValue', JSON.stringify({ movieValue, checked}));

    savedMoviesApi
      .getMovies()
      .then((res) => {
        console.log(res);
        const movies = [];
        res.forEach((movie) => {
          if (movie.description.includes(movieValue) && (checked ? movie.duration <= shortFilm : true)) {
            movies.push(movie)
          }
        })

        localStorage.setItem('savedMovies', JSON.stringify(movies));

        if (movies.length === 0) {
          setTextResponse('К сожалению, не найдено ни одного фильма, удовлетворяющего вашему запросу.');
          setTimeout(() => {
            setIsResponseError(false);
            setTextResponse('');
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleMoviesSave({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    setIsPreloaderOpen(true);
    savedMoviesApi
      .postMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      })
      .then((newCard) => {
        console.log(newCard);
        const movies = JSON.parse(localStorage.getItem('movies'));

        movies.map(m => m.movieId === newCard.movieId ? m.liked = newCard._id : m);

        localStorage.setItem('movies', JSON.stringify(movies));

        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

        if (savedMovies) {
          savedMovies.push(newCard);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }

      })
      .catch((err) => {
        console.log(err);
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  function handleMoviesDelete(movieId) {
    setIsPreloaderOpen(true);
    savedMoviesApi
      .deleteMovie(movieId)
      .then((newCard) => {
        console.log(newCard);
        const movies = JSON.parse(localStorage.getItem('movies'));

        movies.map(m => m.liked === movieId ? m.liked = false : m);

        localStorage.setItem('movies', JSON.stringify(movies));

        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));


        if (savedMovies) {
          const result=savedMovies.filter((m) => m._id !== movieId);
          localStorage.setItem('savedMovies', JSON.stringify(result));
        }

      })
      .catch((err) => {
        console.log(err);
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
  }

  useEffect(() => {
    userApi
      .getUser()
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        setCurrentUser(res);
        navigate()
      })
      .catch(() => {
        setLoggedIn(false);
      })
      .finally(closePreloader);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsPreloaderOpen(true);
      userApi
      .getUser()
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      })
      .finally(closePreloader);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <Layout
            loggedIn={loggedIn}
            isPreloaderOpen={isPreloaderOpen}
          />
        } >
          <Route index element={<Main />} />
          <Route path="movies" element={
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              onGetMovies={handleSubmitMovies}
              onMovieSave={handleMoviesSave}
              onMovieDelete={handleMoviesDelete}
              textResponse={textResponse}
              isResponseError={isResponseError}
            />
          } />
          <Route path="saved-movies" element={
            <ProtectedRoute
              component={SavedMovies}
              loggedIn={loggedIn}
              onGetSavedMovies={handleSubmitSavedMovies}
              onMovieDelete={handleMoviesDelete}
              textResponse={textResponse}
              isResponseError={isResponseError}
            />
          } />
          <Route path="profile" element={
            <ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              onPatchUser={handleSubmitPatchUser}
              onLogout={handleSubmitLogout}
              isResponseError={isResponseError}
              textResponse={textResponse}
            />
          } />
        </Route>
        <Route path="/signup" element={
          <AuthProtectedRoute
            component={Register}
            loggedIn={loggedIn}
            onRegister={handleSubmitRegister}
            isPreloaderOpen={isPreloaderOpen}
            isResponseError={isResponseError}
            textResponse={textResponse}
          />
        } />
        <Route path="/signin" element={
          <AuthProtectedRoute
            component={Login}
            loggedIn={loggedIn}
            onLogin={handleSubmitLogin}
            isPreloaderOpen={isPreloaderOpen}
            isResponseError={isResponseError}
            textResponse={textResponse}
          />
        } />
        <Route path="/*" element={
            <ProtectedRoute
              component={NotFound}
              loggedIn={loggedIn}
            />
          } />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
