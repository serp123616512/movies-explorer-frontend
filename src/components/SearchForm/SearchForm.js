import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({onSubmit}) {
  return (
    <form
      className="search-form"
      id="search-form"
      onSubmit={onSubmit}
    >
      <fieldset className="search-form__wrapper">
        <label className="search-form__label" for="movie" />
        <input
          className="search-form__input"
          id="movie"
          name="movie"
          type="text"
          placeholder="Фильм"
          required
        />
        <input
        className="search-form__submit"
        type="submit"
        form="search-form"
        value=" "
        />
      </fieldset>
      <FilterCheckbox />
      <span id="search-form-error" className="search-form__error">Что-то пошло не так...</span>
    </form>
  )
}

export default SearchForm;
