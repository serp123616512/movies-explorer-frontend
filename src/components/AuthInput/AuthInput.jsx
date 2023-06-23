import React from 'react';

import './AuthInput.css';

function AuthInput({
  formId,
  textLabel,
  name,
  id,
  type,
  placeholder,
  minLength,
  maxLength,
  value,
  onChange,
  textError
}) {
  return (
    <label className="label" form={formId}>
      {textLabel}
      <input
        className="label__input"
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        required
      />
      <span id="error" className="error">{textError}</span>
    </label>
  )
}

export default AuthInput;
