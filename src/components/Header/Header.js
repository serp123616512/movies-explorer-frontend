import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <>
      <header className="header">
        <Routes>
          <Route  path="/" element={
            <>
              <Link to={'/'}>
                <div className="logo button-hover" />
              </Link>
              <div className="header__auth header__auth_activ">
                <Link
                  className="header__link button-hover"
                  to="/signup"
                >Регистрация</Link>
                <Link
                  className="header__button header__button_color_green button-hover"
                  to="/signin"
                >Войти</Link>
              </div>
            </>
          } />
          <Route path="movies" element={
            <>
              <Link to={'/'}>
                <div className="logo button-hover" />
              </Link>
              <nav>
                <ul className="header__nav">
                  <li>
                    <Link
                      className="header__nav-link header__nav-link_action button-hover"
                      to="/movies"
                    >Фильмы</Link>
                  </li>
                  <li>
                    <Link
                      className="header__nav-link button-hover"
                      to="/saved-movies"
                    >Сохранённые фильмы</Link>
                  </li>
                </ul>
              </nav>
              <div className="header__auth">
                <Link
                    className="header__button header__button_color_grey button-hover"
                    to={'/profile'}
                  >Аккаунт</Link>
              </div>
              <button className="burger" />
            </>
          } />
          <Route path="saved-movies" element={
            <>
              <Link to={'/'}>
                <div className="logo button-hover" />
              </Link>
              <nav>
                <ul className="header__nav">
                  <li>
                    <Link
                      className="header__nav-link button-hover"
                      to="/movies"
                    >Фильмы</Link>
                  </li>
                  <li>
                    <Link
                      className="header__nav-link header__nav-link_action button-hover"
                      to="/saved-movies"
                    >Сохранённые фильмы</Link>
                  </li>
                </ul>
              </nav>
              <div className="header__auth">
                <Link
                    className="header__button header__button_color_grey button-hover"
                    to={'/profile'}
                  >Аккаунт</Link>
              </div>
              <button className="burger" />
            </>
          } />
          <Route path="profile" element={
            <>
              <Link to={'/'}>
                <div className="logo button-hover" />
              </Link>
              <nav>
                <ul className="header__nav">
                  <li>
                    <Link
                      className="header__nav-link button-hover"
                      to="/movies"
                    >Фильмы</Link>
                  </li>
                  <li>
                    <Link
                      className="header__nav-link button-hover"
                      to="/saved-movies"
                    >Сохранённые фильмы</Link>
                  </li>
                </ul>
              </nav>
              <div className="header__auth">
                <Link
                    className="header__button header__button_color_grey button-hover"
                    to="/profile"
                  >Аккаунт</Link>
              </div>
              <button className="burger button-hover" />
            </>
          } />
        </Routes>
      </header>
      <Outlet />
    </>
  )
}

export default Header;
