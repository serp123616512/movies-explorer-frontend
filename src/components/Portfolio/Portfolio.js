import React from 'react';
import { Link } from 'react-router-dom';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <ul className="portfolio__list">
        <li>
          <Link
            className="portfolio__link button-hover"
            to="https://github.com/serp123616512/how-to-learn"
            target="_blank"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </Link>
        </li>
        <li>
          <Link
            className="portfolio__link button-hover"
            to="https://serp123616512.github.io/russian-travel"
            target="_blank"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </Link>
        </li>
        <li>
          <Link
            className="portfolio__link button-hover"
            to="https://serp123616512.github.io/mesto/"
            target="_blank"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-text">↗</p>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
