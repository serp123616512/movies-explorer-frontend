import React from 'react';
import useForm from '../../hooks/useForm';

import Auth from '../Auth/Auth';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import Preloader from '../Preloader/Preloader';

function Login({
  onLogin,
  isPreloaderOpen,
  isResponseError,
  textResponse,
}) {
  const formId = "login-form"

  const { values, errors, isFormValid, handleChange, handleSubmit} = useForm();

  return (
    <>
      <Auth
        heading="Рады видеть!"
        formId={formId}
        isResponseError={isResponseError}
        textResponse={textResponse}
        isFormValid={isFormValid}
        textButton="Войти"
        textFooter="Ещё не зарегистрированы?"
        link="/signup"
        textLink="Регистрация"
      >
        <AuthForm
          onSubmit={handleSubmit(onLogin)}
          formId={formId}
        >
          <AuthInput
            formId={formId}
            textLabel="E-mail"
            name="email"
            id="email"
            type="email"
            placeholder="Введите ваш E-mail"
            value={values.email || ''}
            onChange={handleChange}
            textError={errors.email || ''}
          />
          <AuthInput
            formId={formId}
            textLabel="Пароль"
            name="password"
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={values.password || ''}
            onChange={handleChange}
            textError={errors.password || ''}
          />
        </AuthForm>
      </Auth>
      <Preloader isOpen={isPreloaderOpen} />
    </>
  )
}

export default Login;
