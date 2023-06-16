import React, { useContext, useState } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css'

function Profile({ onLogout, onPatchUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onPatchUser({ name, email });
  }

  return (
    <section className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form
        className="profile__form"
        id="profile__form"
        onSubmit={handleSubmit}
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
            value={name}
            onChange={handleChangeName}
            required
          />
        </label>
        <span id="name-error" className="profile__input-error">Что-то пошло не так...</span>
        <label className="profile__label" >
          E&#8209;mail
          <input
            className="profile__input"
            id="email"
            name="email"
            type="email"
            placeholder="Введите ваш E-mail"
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </label>
        <span id="email-error" className="profile__input-error">Что-то пошло не так...</span>
      </form>
      <button
        className="profile__submit button-hover"
        type="submit"
        form="profile__form"
      >Редактировать</button>
      <button
        className="profile__logout button-hover"
        onClick={onLogout}
      >Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
