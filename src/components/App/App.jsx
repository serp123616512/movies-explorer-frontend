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

import { filterFilms, reformFilms } from '../../utils/utils';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isResponseError, setIsResponseError] = useState(false);
  const [textResponse, setTextResponse] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(true);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

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
        setCards([]);
        setSavedCards([]);
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
        setIsResponseError(false);
        setTextResponse('Изменение порофиля прошло успешно.')
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 2000);
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

    if (!(JSON.parse(localStorage.getItem('moviesBitfilms')))) {
      Promise.all([moviesApi.getMovies(), savedMoviesApi.getMovies()])
        .then(([moviesData, savedMovies]) => {
          const moviesBitfilms = reformFilms(moviesData);
          const filteredMovies = filterFilms({ moviesBitfilms, savedMovies, movieValue, checked });
          const filteredSavedMovies = savedMovies;
          setCards(filteredMovies);
          setSavedCards(filteredSavedMovies);

          localStorage.setItem('moviesBitfilms', JSON.stringify(moviesBitfilms));
          localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));

          if (filteredMovies.length === 0) {
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
    } else {
      const moviesBitfilms = JSON.parse(localStorage.getItem('moviesBitfilms'));
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const filteredMovies = filterFilms({ moviesBitfilms, savedMovies, movieValue, checked });

      if (filteredMovies.length === 0) {
        setTextResponse('К сожалению, не найдено ни одного фильма, удовлетворяющего вашему запросу.');
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      }

      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
      setCards(filteredMovies);
      closePreloader();
    }
  }

  function handleSubmitSavedMovies({ movieValue, checked }) {
    setIsPreloaderOpen(true);
    localStorage.setItem('savedMovieInputsValue', JSON.stringify({ movieValue, checked}));

    if (!(JSON.parse(localStorage.getItem('savedMovies')))) {
      savedMoviesApi
        .getMovies()
        .then((res) => {
          localStorage.setItem('savedMovies', JSON.stringify(res));
          const filteredSavedMovies = filterFilms({ moviesBitfilms: res, savedMovies: [], movieValue, checked });
          setSavedCards(filteredSavedMovies);

          localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));

          if (filteredSavedMovies.length === 0) {
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
    } else {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const filteredSavedMovies = filterFilms({ moviesBitfilms: savedMovies, savedMovies: [], movieValue, checked });

      if (filteredSavedMovies.length === 0) {
        setTextResponse('К сожалению, не найдено ни одного фильма, удовлетворяющего вашему запросу.');
        setTimeout(() => {
          setIsResponseError(false);
          setTextResponse('');
        }, 3000);
      }

      localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
      setSavedCards(filteredSavedMovies);
      closePreloader();
    }
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
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));

        if (filteredMovies) {
          filteredMovies.map(m => m.movieId === newCard.movieId ? m.liked = newCard._id : m);
          localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
          setCards(filteredMovies);
        }

        if (savedMovies) {
          savedMovies.push(newCard);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }

        if (filteredSavedMovies) {
          filteredSavedMovies.push(newCard);
          localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
          setSavedCards(filteredSavedMovies);
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
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));

        if (filteredMovies) {
          filteredMovies.map(m => m.liked === movieId ? m.liked = false : m);
          localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
          setCards(filteredMovies);
        }

        if (savedMovies) {
          const result = savedMovies.filter((m) => m._id !== movieId);
          localStorage.setItem('savedMovies', JSON.stringify(result));
        }

        if (filteredSavedMovies) {
          const resultfiltered = filteredSavedMovies.filter((m) => m._id !== movieId);
          localStorage.setItem('filteredSavedMovies', JSON.stringify(resultfiltered));
          setSavedCards(resultfiltered);
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
    if(JSON.parse(localStorage.getItem('filteredMovies'))) {
      setCards(JSON.parse(localStorage.getItem('filteredMovies')))
    }

    if(JSON.parse(localStorage.getItem('filteredSavedMovies'))) {
      setSavedCards(JSON.parse(localStorage.getItem('filteredSavedMovies')))
    }

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
        setCurrentUser({});
        setCards([]);
        setSavedCards([]);
        localStorage.clear();
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
              cards={cards}
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
              cards={savedCards}
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
