import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <Routes>
        <Route  path="/" element={
          <>
            <Link to={'/'}>
              <div className="logo" />
            </Link>
            <div className="header__auth header__auth_activ">
              <Link
                className="header__link"
                to="/signup"
              >Регистрация</Link>
              <Link
                className="header__button header__button_color_green"
                to="/signin"
              >Войти</Link>
            </div>
          </>
        } />
        <Route path="/movies" element={
          <>
            <Link to={'/'}>
              <div className="logo" />
            </Link>
            <nav>
              <ul className="header__nav">
                <li>
                  <Link
                    className="header__nav-link header__nav-link_action"
                    to="/movies"
                  >Фильмы</Link>
                </li>
                <li>
                  <Link
                    className="header__nav-link"
                    to="/saved-movies"
                  >Сохранённые фильмы</Link>
                </li>
              </ul>
            </nav>
            <div className="header__auth">
              <Link
                  className="header__button header__button_color_grey"
                  to={'/profile'}
                >Аккаунт</Link>
            </div>
            <button className="burger" />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Link to={'/'}>
              <div className="logo" />
            </Link>
            <nav>
              <ul className="header__nav">
                <li>
                  <Link
                    className="header__nav-link"
                    to="/movies"
                  >Фильмы</Link>
                </li>
                <li>
                  <Link
                    className="header__nav-link header__nav-link_action"
                    to="/saved-movies"
                  >Сохранённые фильмы</Link>
                </li>
              </ul>
            </nav>
            <div className="header__auth">
              <Link
                  className="header__button header__button_color_grey"
                  to={'/profile'}
                >Аккаунт</Link>
            </div>
            <button className="burger" />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Link to={'/'}>
              <div className="logo" />
            </Link>
            <nav>
              <ul className="header__nav">
                <li>
                  <Link
                    className="header__nav-link"
                    to="/movies"
                  >Фильмы</Link>
                </li>
                <li>
                  <Link
                    className="header__nav-link"
                    to="/saved-movies"
                  >Сохранённые фильмы</Link>
                </li>
              </ul>
            </nav>
            <div className="header__auth">
              <Link
                  className="header__button header__button_color_grey"
                  to="/profile"
                >Аккаунт</Link>
            </div>
            <button className="burger" />
          </>
        } />
      </Routes>
    </header>
  )
}

export default Header;
