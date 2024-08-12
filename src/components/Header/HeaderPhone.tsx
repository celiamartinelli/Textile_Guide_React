import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosInformationCircle } from 'react-icons/io';
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSun } from 'react-icons/fi';
import { RiMoonFill } from 'react-icons/ri';
import { useDarkMode } from '../App/DarkModeContext';
import LanguageSwitcher from '../Button/LanguageSwitcher';

const HeaderPhone: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const textileLogo = isDarkMode
    ? '../../../assets/guide_textile_dark.png'
    : '../../../assets/guide_textile.png';
  return (
    <header className="flex font-thasadith-bold font-bold relative">
      <nav className="fixed top-0 left-0 right-0">
        <ul className="flex flex-row w-screen h-20 justify-between text-white text-xl font-bold bg-lightBackground dark:bg-darkPruneBG  items-center px-8">
          <li className="p-2 rounded-full hover:bg-lightBackgroundLight dark:hover:bg-darkBackgroundLightHover ">
            <Link to="/about">
              <IoIosInformationCircle />
            </Link>
          </li>
          <li className="size-4/12 sm:size-2/12 lg:size-2/12">
            <Link to="/">
              <img
                className="border rounded-full shadow-md"
                src={textileLogo}
                alt="Guide Textile Logo"
              />
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <LanguageSwitcher />
            <button
              aria-label="Activer le Dark Mode"
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className=" text-white p-2 rounded-full hover:bg-lightBackgroundLight dark:hover:bg-darkPrune"
            >
              {isDarkMode ? <FiSun /> : <RiMoonFill />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderPhone;
