import React from "react";
import { Link } from "react-router-dom";

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copy">© 2023</p>
        <ul className="footer__list">
          <li className="footer__block">
            <Link
              className="footer__link"
              to="https://practicum.yandex.ru/"
              target="_blank"
            >Яндекс.Практикум</Link>
          </li>
          <li className="footer__block">
          <Link
              className="footer__link"
              to="https://github.com/"
              target="_blank"
            >Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
