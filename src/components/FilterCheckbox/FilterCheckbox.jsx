import React from 'react';

import './FilterCheckbox.css'

function FilterCheckbox({ checked, setChecked }) {

  return (
    <label className="filter-checkbox button-hover">
      <input
        className="filter-checkbox__input button-hover"
        id="checked"
        name="checked"
        form="search-form"
        type="checkbox"
        checked={checked}
        onChange={setChecked}
      />
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;
