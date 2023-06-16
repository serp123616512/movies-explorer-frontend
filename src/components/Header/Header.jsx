import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.css';

function Header({loggedIn, onBurgerClick}) {
  return (
    <header className="header">
      <Link to="/">
        <div className="logo button-hover" />
      </Link>
      {loggedIn ? (
        <>
          <nav>
            <ul className="header__nav">
              <li>
                <NavLink
                  className={({ isActive }) => isActive ? "header__nav-link button-hover header__nav-link_action" : "header__nav-link button-hover"}
                  to="/movies"
                >Фильмы</NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => isActive ? "header__nav-link button-hover header__nav-link_action" : "header__nav-link button-hover"}
                  to="/saved-movies"
                >Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </nav>
          <div className="header__auth">
          <Link
              className="header__button header__button_color_grey button-hover"
              to={'/profile'}
            >Аккаунт</Link>
          </div>
          <button
            className="burger header__button"
            onClick={onBurgerClick}
          />
        </>
      ) : (
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
      )}
    </header>
  )
}

export default Header;
