import React from 'react'
import { Link } from 'react-router-dom';

import './MoviesCard.css'

function MoviesCard ({card}) {
  const duration = (dur) => {
    if (dur < 60) return `${dur}м`;
    if (dur >= 60) {
      const hours = (Math.floor(dur/60));
      const minutes = dur % 60;
      return `${hours}ч ${minutes}м`;
    }
    return false;
  }

  return (
    <li className="card">
      <img
        className="card__img"
        src={card.image}
        alt={card.nameRU}
      />
      <div className="card__info">
        <Link className="card__link" to={card.trailerLink}>{card.nameRU}</Link>
        <button
        className="card__like"
      />
      </div>
      <p className="card__duration">{duration(card.duration)}</p>
    </li>
  )
};

export default MoviesCard;
