import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ onGetSavedMovies, isResponseError, textResponse, onMovieDelete }) {
    return (
    <section className="saved-movies">
      <SearchForm
        inputsValue={JSON.parse(localStorage.getItem('savedMovieInputsValue')) || { movieValue: '', checked: false }}
        onSubmit={onGetSavedMovies}
        isResponseError={isResponseError}
        textResponse={textResponse}
      />
      <MoviesCardList
        cards={JSON.parse(localStorage.getItem('savedMovies')) || []}
        onMovieDelete={onMovieDelete}
      />
    </section>
  )
}

export default SavedMovies;
