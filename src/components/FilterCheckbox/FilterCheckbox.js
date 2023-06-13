import React from 'react';

import './FilterCheckbox.css'

function FilterCheckbox({onSubmit}) {
  return (
    <label className="filter-checkbox button-hover">
      <input
        className="filter-checkbox__input button-hover"
        id="checkbox"
        form="search-form"
        type="checkbox"
      />
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;
