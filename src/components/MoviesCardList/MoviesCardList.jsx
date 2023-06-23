import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList ({cards, onMovieSave, onMovieDelete }) {
  const location = useLocation();

  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [movies, setMovies] = useState([]);
  const [remainingMovies, setRemainingMovies] = useState([]);

  useLayoutEffect(() => {
    setWidth(ref.current.clientWidth);
    if (ref.current.clientWidth > 887) {
      setMovies(cards.slice(0, 12));
      setRemainingMovies(cards.slice(12));
    } else if (ref.current.clientWidth < 590) {
      setMovies(cards.slice(0, 5));
      setRemainingMovies(cards.slice(5));
    } else {
      setMovies(cards.slice(0, 8));
      setRemainingMovies(cards.slice(8));
    }
  }, [cards]);

  useEffect(() => {
    function handleWidthResize() {
      setWidth(ref.current.clientWidth);
    }

    window.addEventListener('resize', handleWidthResize);

    return () => {
      window.removeEventListener('resize', handleWidthResize);
    };
  }, []);

  function handleAddMoviesWide () {
    setMovies([...movies, ...remainingMovies.slice(0, 3)]);
    setRemainingMovies(remainingMovies.slice(3));
  }

  function handleAddMoviesNarrow () {
    setMovies([...movies, remainingMovies.slice(0, 2)]);
    setRemainingMovies(remainingMovies.slice(2));
  }


  return (
    <section ref={ref} className="movies-card-list">
      <ul className="movies-card-list__cards">
        {movies && movies.map(card => {
          return(
            <MoviesCard
              key={card.movieId}
              card={card}
              onMovieSave={onMovieSave}
              onMovieDelete={onMovieDelete}
            />
          )
        })}
      </ul>
      {location.pathname === '/movies' && (movies.length !== 0) && (remainingMovies.length !== 0) && (
        <button
        className="movies-card-list__button button-hover"
        onClick={() => {
          if (width > 887) {
            handleAddMoviesWide();
          } else {
            handleAddMoviesNarrow();
          }
        }}
      >Ещё</button>
      )}
    </section>
  )
};

export default MoviesCardList;
