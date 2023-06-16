import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { cards } from '../../utils/constants';

import './Movies.css';

function Movies({ onGetMovies }) {
    return (
    <section className="movies">
      <SearchForm
        onSubmit={onGetMovies}
      />
      <MoviesCardList
        cards={cards}
      />
    </section>
  )
}

export default Movies;
