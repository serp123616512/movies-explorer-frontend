import React from 'react';


import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__heading">О проекте</h2>
        <ul className="about-project__articles">
          <li className="about-project__article">
            <h3 className="about-project__article-heading">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__article-text">
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и&nbsp;финальные доработки.
            </p>
          </li>
          <li className="about-project__article">
            <h3 className="about-project__article-heading">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__article-text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__plan">
          <p className="about-project__first-block">1 неделя</p>
          <p className="about-project__second-block">4 недели</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
