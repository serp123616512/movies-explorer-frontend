import React from 'react';

import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <h2 className="techs__heading">Технологии</h2>
        <div className="techs__article">
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__subtitle">
            На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии,
            которые применили в&nbsp;дипломном проекте.
          </p>
          <ul className="techs__cards">
            <li className="techs__card">HTML</li>
            <li className="techs__card">CSS</li>
            <li className="techs__card">JS</li>
            <li className="techs__card">React</li>
            <li className="techs__card">Git</li>
            <li className="techs__card">Express.js</li>
            <li className="techs__card">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Techs;
