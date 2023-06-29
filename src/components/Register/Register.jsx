import React from 'react';
import useForm from '../../hooks/useForm';

import Auth from '../Auth/Auth';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import Preloader from '../Preloader/Preloader';

function Register({
  onRegister,
  isPreloaderOpen,
  isResponseError,
  textResponse,
}) {
  const formId = "register-form"

  const { values, errors, isFormValid, handleChange, handleSubmit} = useForm();

  return (
    <>
      <Auth
        heading="Добро пожаловать!"
        formId={formId}
        isResponseError={isResponseError}
        textResponse={textResponse}
        isFormValid={isFormValid}
        textButton="Зарегистрироваться"
        textFooter="Уже зарегистрированы?"
        link="/signin"
        textLink="Войти"
      >
        <AuthForm
          onSubmit={handleSubmit(onRegister)}
          formId={formId}
        >
          <AuthInput
            formId={formId}
            textLabel="Имя"
            name="name"
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={handleChange}
            textError={errors.name || ''}
          />
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

export default Register;
