import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun } from 'react-icons/fi';
import { RiMoonFill } from 'react-icons/ri';
import { useDarkMode } from '../App/DarkModeContext';
import LanguageSwitcher from '../Button/LanguageSwitcher';

const HeaderDesktop: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const textileLogo = isDarkMode
    ? '../../../assets/guide_textile_dark.png'
    : '../../../assets/guide_textile.png';

  return (
    <header className="flex font-thasadith-bold font-bold relative ">
      <nav className="fixed top-0 left-0 right-0">
        <ul className="flex flex-row w-screen h-24 justify-around text-white text-xl font-bold bg-lightBackground dark:bg-darkBackground  items-center">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li className="mr-24">
            <Link to="/products">Projets</Link>
          </li>

          <li className="absolute top-3">
            <Link to="/">
              <img
                className="border rounded-full shadow-md w-40 h-40"
                src={textileLogo}
                alt="Guide Textile Logo"
              ></img>
            </Link>
          </li>
          <li className="ml-24">
            <Link to="/fabrics">Tissus</Link>
          </li>

          <li className="flex">
            <LanguageSwitcher />
            <button
              aria-label="Activer le Dark Mode"
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className=" text-white py-2 px-4 rounded-md hover:bg-lightBackgroundLight  dark:hover:bg-darkBackgroundLightHover"
            >
              {isDarkMode ? <FiSun /> : <RiMoonFill />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderDesktop;
