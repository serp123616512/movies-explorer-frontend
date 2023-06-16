import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import BurgerPopup from '../BurgerPopup/BurgerPopup';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';



function Layout({
    loggedIn,
    isPreloaderOpen,
  }) {
  const location = useLocation();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function handleBurgerClick() {
    setIsBurgerOpen(true)
  }

  function closeBurger() {
    setIsBurgerOpen(false)
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        onBurgerClick={handleBurgerClick}
      />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
      <BurgerPopup
        isOpen={isBurgerOpen}
        onClose={closeBurger}
      />
      <Preloader
        isOpen={isPreloaderOpen}
      />
    </>
  )
}

export default Layout;
