import React from 'react'
import { useLocation, Link } from 'react-router-dom';

import { duration } from '../../utils/utils';

import './MoviesCard.css'

function MoviesCard ({card, onMovieSave, onMovieDelete}) {
  const location = useLocation();

  return (
    <li className="card">
      <img
        className="card__img"
        src={card.image}
        alt={card.nameRU}
      />
      <div className="card__info">
        <Link className="card__link button-hover" to={card.trailerLink}>{card.nameRU}</Link>
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
