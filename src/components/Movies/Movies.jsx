import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ onGetMovies, isResponseError, textResponse, onMovieSave, onMovieDelete, cards }) {
  return (
    <section className="movies">
      <SearchForm
        inputsValue={JSON.parse(localStorage.getItem('movieInputsValue')) || { movieValue: '', checked: false }}
        onSubmit={onGetMovies}
        isResponseError={isResponseError}
        textResponse={textResponse}
        required={true}
      />
      <MoviesCardList
        cards={cards}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
        onSubmit={onGetMovies}
      />
    </section>
  )
}

export default Movies;
