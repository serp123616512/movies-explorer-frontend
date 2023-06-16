import React from 'react';
import { useState } from 'react';

import Auth from '../Auth/Auth';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import Preloader from '../Preloader/Preloader';

function Register({
  onRegister,
  isPreloaderOpen,
}) {
  const formId = "register-form"

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({ name, email, password });
  }

  return (
    <>
      <Auth
        heading="Добро пожаловать!"
        formId={formId}
        textButton="Зарегистрироваться"
        textFooter="Уже зарегистрированы?"
        link="/signin"
        textLink="Войти"
      >
        <AuthForm
          onSubmit={handleSubmit}
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
            value={name}
            onChange={handleChangeName}
          />
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

export default Register;
