import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ onGetMovies, isResponseError, textResponse, onMovieSave, onMovieDelete }) {
    return (
    <section className="movies">
      <SearchForm
        inputsValue={JSON.parse(localStorage.getItem('movieInputsValue')) || { movieValue: '', checked: false }}
        onSubmit={onGetMovies}
        isResponseError={isResponseError}
        textResponse={textResponse}
      />
      <MoviesCardList
        cards={JSON.parse(localStorage.getItem('movies')) || []}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
      />
    </section>
  )
}

export default Movies;
