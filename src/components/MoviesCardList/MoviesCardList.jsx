import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import authApi from '../../utils/AuthApi';

import './MoviesCardList.css';

function MoviesCardList ({cards}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">
        {cards.map(card => {
          return(
            <MoviesCard
              key={card.id}
              card={card}
            />
          )
        })}
      </ul>
      <button
        className="movies-card-list__button button-hover"
        onClick={() => {
          authApi
            .signIn({ email: '123123131', password: '12345678' })
            .then(console.log)
            .catch(console.log)
        }}
      >Ещё</button>
    </section>
  )
};

export default MoviesCardList;
