import React from 'react';
import { Link } from 'react-router-dom';

import Portfolio from '../Portfolio/Portfolio';

import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__heading">Студент</h2>
        <div className="about-me__article">
          <div className="about-me__info">
            <div className="about-me__main-info">
              <h3 className="about-me__title">Сергей</h3>
              <h4 className="about-me__subtitle">
                Фронтенд-разработчик, 30 лет
              </h4>
              <p className="about-me__text">
                Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
                закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь.
                Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
                Недавно начал кодить.
                С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
                После того, как прошёл курс по&nbsp;веб-разработке,
                начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
              </p>
            </div>
            <Link
              className="about-me__link-github"
              to="https://github.com/serp123616512"
              target="_blank"
            >Github</Link>
          </div>
          <div className="about-me__foto" />
        </div>
        <Portfolio />
      </div>
    </section>
  )
}

export default AboutMe;
