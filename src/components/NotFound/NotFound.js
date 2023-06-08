import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h1 className="not-found__status">404</h1>
      <h2 className="not-found__message">Страница не найдена</h2>
      <button
        className="not-found__button"
        onClick={() => navigate(-1)}
      >Назад</button>
    </section>
  )
}

export default NotFound;
