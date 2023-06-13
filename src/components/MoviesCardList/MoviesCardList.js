import React from 'react'

import MoviesCard from '../MoviesCard/MoviesCard'

import './MoviesCardList.css'

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
      <button className="movies-card-list__button button-hover">Ещё</button>
    </section>
  )
};

export default MoviesCardList;
