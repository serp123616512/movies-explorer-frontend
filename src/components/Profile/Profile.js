import React from 'react';

import './Profile.css'

function Profile({onSubmit}) {
  return (
    <section className="profile">
      <h1 className="profile__heading">Привет, Виталий!</h1>
      <form
        className="profile__form"
        id="profile__form"
        onSubmit={onSubmit}
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
      <button className="profile__logout button-hover">Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
