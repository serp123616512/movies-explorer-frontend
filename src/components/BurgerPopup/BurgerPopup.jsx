import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './BurgerPopup.css';

function BurgerPopup({ isOpen, onClose }) {
  return (
    <section className={`burger-popup ${isOpen && 'burger-popup_opened'}`}>
      <div className="burger-popup__container">
        <button
          className="burger-popup__close"
          onClick={onClose}
        />
        <nav>
          <ul className="burger-popup__nav">
            <li className="burger-popup__nav-li">
              <NavLink
                className={({ isActive }) => isActive ? "burger-popup__nav-link button-hover burger-popup__nav-link_action" : "burger-popup__nav-link button-hover"}
                to="/"
                onClick={onClose}
              >Главная</NavLink>
            </li>
            <li className="burger-popup__nav-li">
              <NavLink
                className={({ isActive }) => isActive ? "burger-popup__nav-link button-hover burger-popup__nav-link_action" : "burger-popup__nav-link button-hover"}
                to="/movies"
                onClick={onClose}
              >Фильмы</NavLink>
            </li>
            <li className="burger-popup__nav-li">
              <NavLink
                className={({ isActive }) => isActive ? "burger-popup__nav-link button-hover burger-popup__nav-link_action" : "burger-popup__nav-link button-hover"}
                to="/saved-movies"
                onClick={onClose}
              >Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <div className="burger-popup__auth">
          <Link
              className="burger-popup__button button-hover"
              to="/profile"
              onClick={onClose}
            >Аккаунт</Link>
        </div>
      </div>
    </section>
  )
}

export default BurgerPopup;
