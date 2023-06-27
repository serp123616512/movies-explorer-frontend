import React from 'react'
import { useLocation, Link } from 'react-router-dom';

import { duration } from '../../utils/utils';

import './MoviesCard.css'

function MoviesCard ({card, onMovieSave, onMovieDelete}) {
  const location = useLocation();

  return (
    <li className="card">
      <Link className="card__link button-hover" to={card.trailerLink}>
        <img
          className="card__img"
          src={card.image}
          alt={card.nameRU}
        />
      </Link>
      <div className="card__info">
        <h2 className="card__heading">{card.nameRU}</h2>
        {location.pathname === '/movies' && (
          <button
          className={card.liked ? 'card__like card__like_active button-hover' : 'card__like button-hover'}
          onClick={() => card.liked ? onMovieDelete(card.liked) : onMovieSave(card)}
        />
        )}
        {location.pathname === '/saved-movies' && (
          <button
          className="card__delete button-hover"
          onClick={() => onMovieDelete(card._id)}
        />
        )}
      </div>
      <p className="card__duration">{duration(card.duration)}</p>
    </li>
  )
};

export default MoviesCard;
