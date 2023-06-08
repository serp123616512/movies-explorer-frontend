import React from 'react';

import Auth from '../Auth/Auth.js';
import AuthForm from '../AuthForm/AuthForm.js';
import AuthInput from '../AuthInput/AuthInput.js';

function Register({onSubmit}) {
  const formId = "register-form"

  return (
    <Auth
      heading="Добро пожаловать!"
      formId={formId}
      textButton="Зарегистрироваться"
      textFooter="Уже зарегистрированы?"
      link="/signin"
      textLink="Войти"
    >
      <AuthForm
        onSubmit={onSubmit}
        formId={formId}
      >
        <AuthInput
          formId={formId}
          name="Имя"
          id="name"
          type="text"
          placeholder="Введите ваше имя"
          minLength="2"
          maxLength="30"
        />
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

export default Register;
