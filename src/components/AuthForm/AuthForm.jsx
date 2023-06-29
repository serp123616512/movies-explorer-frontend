import React from 'react';

import './AuthForm.css';

function AuthForm({formId, onSubmit, children}) {
  return (
    <form
      className="auth-form"
      id={formId}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}

export default AuthForm;
