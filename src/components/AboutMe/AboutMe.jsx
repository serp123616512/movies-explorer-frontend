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
                Я&nbsp;родился и&nbsp;живу в&nbsp;Заречном (Пензенской области),
                закончил факультет Физической и квантовой электроники МФТИ. О&nbsp;способностях к&nbsp;программированию узнал в&nbsp;школе. Но&nbsp;в&nbsp;тот момент больше привлекала физика.
                После института и&nbsp;работы на&nbsp;заводе в&nbsp;лаборатории понял что это не&nbsp;мое. Решил вспомнить программирование и&nbsp;как писал простенькие странички.
                Обратил внимание, что посещаю много кривых и&nbsp;недоделанных сайтов. Понял что могу сделать лучше и&nbsp;начал развиваться в&nbsp;этом направлении.
                В&nbsp;вебе привлекает видимый результат разработки, возможность реализовать разнообразные идеи.
                Кайфую от&nbsp;создания эстетичного, качественного и&nbsp;полезного продукта.
              </p>
              <p class="about-me__text">
                Читаю разные статьи на хабре. Смотрю видео по новым технологиям в Ютубе. Начал изучать TypeScript.
              </p>
              <p class="about-me__text">
                В свободное время увлекаюсь загородным строительством (проектированием и реализацией) и&nbsp;столярничеством. Считаю это искусством.
              </p>
            </div>
            <Link
              className="about-me__link-github button-hover"
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
