import React from 'react';

import './AuthInput.css';

function AuthInput({
  formId,
  name,
  id,
  type,
  placeholder,
  minLength,
  maxLength,
}) {
  return (
    <label className="label" form={formId}>
      {name}
      <input
        className="label__input"
        id={id}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span id="error" className="error">Что-то пошло не так...</span>
    </label>
  )
}

export default AuthInput;
