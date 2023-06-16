import React from 'react';
import { useState } from 'react';

import Auth from '../Auth/Auth';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import Preloader from '../Preloader/Preloader';

function Login({
  onLogin,
  isPreloaderOpen,
}) {
  const formId = "login-form"

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({ email, password });
  }

  return (
    <>
      <Auth
        heading="Рады видеть!"
        formId={formId}
        textButton="Войти"
        textFooter="Ещё не зарегистрированы?"
        link="/signup"
        textLink="Регистрация"
      >
        <AuthForm
          onSubmit={handleSubmit}
          formId={formId}
        >
          <AuthInput
            formId={formId}
            name="E-mail"
            id="email"
            type="email"
            placeholder="Введите ваш E-mail"
            value={email}
            onChange={handleChangeEmail}
          />
          <AuthInput
            formId={formId}
            name="Пароль"
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={handleChangePassword}
          />
        </AuthForm>
      </Auth>
      <Preloader isOpen={isPreloaderOpen} />
    </>
  )
}

export default Login;
