import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
      <nav>
        <ul className="nav-tab__nav">
          <li>
          <Link
            className="nav-tab__link button-hover"
            smooth
            to="/#about-project"
          >О проекте</Link>
          </li>
          <li>
          <Link
            className="nav-tab__link button-hover"
            smooth
            to="/#techs"
          >Технологии</Link>
          </li>
          <li>
          <Link
            className="nav-tab__link button-hover"
            smooth
            to="/#about-me"
          >Студент</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default NavTab;
