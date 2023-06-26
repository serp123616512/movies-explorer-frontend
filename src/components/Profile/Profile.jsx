import React, { useContext } from 'react';
import { useEffect } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';

import './Profile.css'

function Profile({ onLogout, onPatchUser, isResponseError, textResponse }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isFormValid, handleChange, handleSubmit, hendleReset } = useForm();

  useEffect(() => {
    hendleReset({ name: currentUser.name, email: currentUser.email }, {}, true);
  }, [currentUser, hendleReset]);

  return (
    <section className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form
        className="profile__form"
        id="profile__form"
        onSubmit={handleSubmit(onPatchUser)}
      >
        <label className="profile__label" >
          Имя
          <input
            className="profile__input"
            id="name"
            name="name"
            type="text"
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <span className="profile__input-error">{errors.name}</span>
        <label className="profile__label" >
          E&#8209;mail
          <input
            className="profile__input"
            id="email"
            name="email"
            type="email"
            placeholder="Введите ваш E-mail"
            value={values.email || ''}
            onChange={handleChange}
            required
          />
        </label>
        <span className="profile__input-error">{errors.email}</span>
      </form>
      <p className={isResponseError ? 'profile__response profile__response_error' : 'profile__response'}>{textResponse}</p>
      <button
        className="profile__submit button-hover"
        type="submit"
        form="profile__form"
        disabled={!isFormValid || !(values.name !== currentUser.name || values.email !== currentUser.email)}
      >Редактировать</button>
      <button
        className="profile__logout button-hover"
        onClick={onLogout}
      >Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
