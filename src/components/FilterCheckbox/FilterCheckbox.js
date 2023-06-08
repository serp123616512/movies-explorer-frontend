import React from 'react';

import './FilterCheckbox.css'

function FilterCheckbox({onSubmit}) {
  return (
    <label className="label">
      <input
        className="checkbox"
        id="checkbox"
        form="search-form"
        type="checkbox"
      />
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;
