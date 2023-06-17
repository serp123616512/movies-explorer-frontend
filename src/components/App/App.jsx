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

import { configMoviesApi } from '../../utils/constants';

function App() {
  const navigate = useNavigate();

  const movies = [];

  const [loggedIn, setLoggedIn] = useState(false);
  const [isResponseError, setIsResponseError] = useState(false);
  const [textResponse, setTextResponse] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(true);

  function closePreloader() {
    setIsPreloaderOpen(false);
  }

  function handleSubmitRegister( {name, email, password} ) {
    setIsPreloaderOpen(true);
    authApi
      .signUp( {name, email, password} )
      .then((res) => {
        setIsResponseError(false);
        setTextResponse('Регистрация прошла успешно.');
        setTimeout(() => {
          setTextResponse('');
          navigate('/signin');
        }, 1000);
      })
      .catch((err) => {
        setIsResponseError(true);
        if (err.message === 'Failed to fetch') {
          setTextResponse('Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.')
        } else if (err.validation.body.keys[0] === 'email') {
          setTextResponse('Поле "E-mail" заполнено неправильно.')
        } else {
          setTextResponse(err.message);
        }
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 5000);
      })
      .finally(closePreloader);
  }

  function handleSubmitLogin( {email, password} ) {
    setIsPreloaderOpen(true);
    authApi
      .signIn( {email, password} )
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
        }, 5000);
      })
      .finally(closePreloader);
  }

  function handleSubmitLogout() {
    setIsPreloaderOpen(true);
    authApi
      .signOut()
      .then((res) => {
        console.log(res);
        setLoggedIn(false)
        navigate('/')
      })
      .catch(console.log)
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
      .catch(console.log)
      .finally(closePreloader);
  }

  function handleSubmitMuvies({ movieValue, checked }) {
    setIsPreloaderOpen(true);

    console.log(movieValue);
    console.log(checked);

    moviesApi
      .getMovies()
      .then((res) => {
        console.log(res);

        res.forEach((movie) => {
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
          })
        })

        const newMovies = movies.filter((movie) => {
          return movie.description.includes(movieValue);
        })


        localStorage.setItem('movies', JSON.stringify(newMovies));
      })
      .catch(console.log)
      .finally(closePreloader);
  }

  function handleSubmitSavedMovies() {
    setIsPreloaderOpen(true);
    savedMoviesApi
      .getMovies()
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .catch(console.log)
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
      .then((res) => {
        console.log(res);
      })
      .catch(console.log)
      .finally(closePreloader);
  }

  function handleMoviesDelete(movieId) {
    setIsPreloaderOpen(true);
    savedMoviesApi
      .deleteMovie(movieId)
      .then((res) => {
        console.log(res);
      })
      .catch(console.log)
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
              onGetMovies={handleSubmitMuvies}
            />
          } />
          <Route path="saved-movies" element={
            <ProtectedRoute
              component={SavedMovies}
              loggedIn={loggedIn}
            />
          } />
          <Route path="profile" element={
            <ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              onPatchUser={handleSubmitPatchUser}
              onLogout={handleSubmitLogout}
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
