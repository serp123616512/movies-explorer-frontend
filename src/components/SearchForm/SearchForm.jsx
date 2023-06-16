import React, { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({onSubmit}) {
  const [movieValue, setMovie] = useState('')
  const [checked, setChecked] = useState(false)

  function handleChangeMovie(e) {
    setMovie(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({ movieValue, checked });
  }

  return (
    <form
      className="search-form"
      id="search-form"
      onSubmit={handleSubmit}
    >
      <fieldset className="search-form__wrapper">
        <label className="search-form__label" htmlFor="movie" />
        <input
          className="search-form__input"
          id="movie"
          name="movie"
          type="text"
          placeholder="Фильм"
          value={movieValue}
          onChange={handleChangeMovie}
          required
        />
        <input
        className="search-form__submit button-hover"
        type="submit"
        form="search-form"
        value=" "
        />
      </fieldset>
      <FilterCheckbox
        checked={checked}
        setChecked={setChecked}
      />
      <span id="search-form-error" className="search-form__error">Что-то пошло не так...</span>
    </form>
  )
}

export default SearchForm;
