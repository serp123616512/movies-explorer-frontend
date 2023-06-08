import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';

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

import './App.css';

function App() {


  return (
    <CurrentUserContext.Provider>
      <Header />
      <Movies />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
