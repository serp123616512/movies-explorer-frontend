import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../AuthForm/AuthForm';

import './Auth.css';

function Auth({
  heading,
  formId,
  children,
  textButton,
  textFooter,
  link,
  textLink,
}) {
  return (
    <section className="auth">
      <div className="auth__header">
        <Link
          className="auth__header-link"
          to="/"
        />
        <h1 className="auth__heading">{heading}</h1>
      </div>
      {children}
      <div className="auth__footer">
        <button
          className="auth__button"
          form={formId}
          type="submit"
        >{textButton}</button>
        <p className="auth__text">
          {textFooter}
          <Link
            className="auth__footer-link"
            to={link}
          >{textLink}</Link>
        </p>
      </div>
    </section>
  )
}

export default Auth;
