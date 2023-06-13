import React from 'react';

import Auth from '../Auth/Auth.js';
import AuthForm from '../AuthForm/AuthForm.js';
import AuthInput from '../AuthInput/AuthInput.js';

function Login({onSubmit}) {
  const formId = "login-form"

  return (
    <Auth
      heading="Рады видеть!"
      formId={formId}
      textButton="Войти"
      textFooter="Ещё не зарегистрированы?"
      link="/signup"
      textLink="Регистрация"
    >
      <AuthForm
        onSubmit={onSubmit}
        formId={formId}
      >
        <AuthInput
          formId={formId}
          name="E-mail"
          id="email"
          type="email"
          placeholder="Введите ваш E-mail"
        />
        <AuthInput
          formId={formId}
          name="Пароль"
          id="password"
          type="password"
          placeholder="Введите ваш пароль"
        />
      </AuthForm>
    </Auth>
  )
}

export default Login;
