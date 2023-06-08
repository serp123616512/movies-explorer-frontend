import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies() {
  const cards = [];

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        cards={cards}
      />
    </section>
  )
}

export default Movies;
