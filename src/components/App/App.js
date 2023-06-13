import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Header from '../Header/Header';
import BurgerPopup from '../BurgerPopup/BurgerPopup';
import Preloader from '../Preloader/Preloader'
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

import './App.css';

function App() {


  return (
    <CurrentUserContext.Provider>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={
            <>
              <Main />
              <Footer />
            </>
          } />
          <Route path="movies" element={
            <>
              <Movies />
              <Footer />
            </>
          } />
          <Route path="saved-movies" element={
            <>
              <SavedMovies />
              <Footer />
            </>
          } />
          <Route path="profile" element={
            <Profile />
          } />
        </Route>
        <Route path="/signup" element={
          <Register />
        } />
        <Route path="/signin" element={
          <Login />
        } />
        <Route path="*" element={
          <NotFound />
        } />
      </Routes>
      <BurgerPopup />
      <Preloader />
    </CurrentUserContext.Provider>
  );
}

export default App;
