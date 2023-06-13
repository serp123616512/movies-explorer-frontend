import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import './BurgerPopup.css';

function BurgerPopup() {
  return (
    <section className="burger-popup ">
      <Routes>
        <Route path="/movies" element={
          <div className="burger-popup__container">
            <button className="burger-popup__close" />
            <nav>
              <ul className="burger-popup__nav">
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/"
                  >Главная</Link>
                </li>
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link burger-popup__nav-link_action"
                    to="/movies"
                  >Фильмы</Link>
                </li>
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/saved-movies"
                  >Сохранённые фильмы</Link>
                </li>
              </ul>
            </nav>
            <div className="burger-popup__auth">
              <Link
                  className="burger-popup__button"
                  to="/profile"
                >Аккаунт</Link>
            </div>
          </div>
        } />
        <Route path="/saved-movies" element={
          <div className="burger-popup__container">
            <button className="burger-popup__close" />
            <nav>
              <ul className="burger-popup__nav">
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/"
                  >Главная</Link>
                </li>
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/movies"
                  >Фильмы</Link>
                </li>
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link  burger-popup__nav-link_action"
                    to="/saved-movies"
                  >Сохранённые фильмы</Link>
                </li>
              </ul>
            </nav>
            <div className="burger-popup__auth">
              <Link
                  className="burger-popup__button"
                  to="/profile"
                >Аккаунт</Link>
            </div>
          </div>
        } />
        <Route path="/profile" element={
          <div className="burger-popup__container">
            <button className="burger-popup__close" />
            <nav>
              <ul className="burger-popup__nav">
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/"
                  >Главная</Link>
                </li>
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/movies"
                  >Фильмы</Link>
                </li>
                <li className="burger-popup__nav-li">
                  <Link
                    className="burger-popup__nav-link"
                    to="/saved-movies"
                  >Сохранённые фильмы</Link>
                </li>
              </ul>
            </nav>
            <div className="burger-popup__auth">
              <Link
                  className="burger-popup__button"
                  to="/profile"
                >Аккаунт</Link>
            </div>
          </div>
        } />
      </Routes>
    </section>
  )
}

export default BurgerPopup;
