import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ onGetSavedMovies, isResponseError, textResponse, onMovieDelete, cards }) {
    return (
    <section className="saved-movies">
      <SearchForm
        inputsValue={JSON.parse(localStorage.getItem('savedMovieInputsValue')) || { movieValue: '', checked: false }}
        onSubmit={onGetSavedMovies}
        isResponseError={isResponseError}
        textResponse={textResponse}
        required={false}
      />
      <MoviesCardList
        cards={cards}
        onMovieDelete={onMovieDelete}
      />
    </section>
  )
}

export default SavedMovies;
