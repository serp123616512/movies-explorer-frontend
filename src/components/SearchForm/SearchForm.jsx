import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({ inputsValue, onSubmit, isResponseError, textResponse }) {

  const { values, errors, isFormValid, handleChange, handleSubmit, hendleReset } = useForm();

  useEffect(() => {
    hendleReset({ movieValue: inputsValue.movieValue, checked: inputsValue.checked }, {}, false);
  }, [inputsValue, hendleReset]);

  return (
    <form
      className="search-form"
      id="search-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate={true}
    >
      <fieldset className="search-form__wrapper">
        <label className="search-form__label" htmlFor="movieValue" />
        <input
          className="search-form__input"
          id="movieValue"
          name="movieValue"
          type="text"
          placeholder="Фильм"
          value={values.movieValue || ''}
          onChange={handleChange}
          required
        />
        <input
        className="search-form__submit button-hover"
        type="submit"
        form="search-form"
        value=" "
        disabled={!isFormValid}
        />
      </fieldset>
      <FilterCheckbox
        checked={values.checked || false}
        setChecked={handleChange}
      />
      <span
        id="search-form-errro"
        className={(!isFormValid || isResponseError) ? 'search-form__text search-form__text_error' : 'search-form__text'}
      >{textResponse}{errors.movieValue || ''}</span>
    </form>
  )
}

export default SearchForm;
