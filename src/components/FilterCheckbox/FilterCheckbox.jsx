import React from 'react';

import './FilterCheckbox.css'

function FilterCheckbox({ checked, setChecked }) {

  function handleChangeChecked(e) {
    setChecked(e.target.checked);
  }

  return (
    <label className="filter-checkbox button-hover">
      <input
        className="filter-checkbox__input button-hover"
        id="checkbox"
        form="search-form"
        type="checkbox"
        checked={checked}
        onChange={handleChangeChecked}
      />
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;
