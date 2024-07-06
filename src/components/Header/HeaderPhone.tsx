import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderPhone: React.FC = () => {
  return (
    <header className="flex font-thasadith-bold font-bold relative">
      <nav className="fixed top-0 left-0 right-0">
        <ul className="flex flex-row w-screen h-20 justify-between text-white text-xl font-bold bg-sage items-center">
          <li className="px-8">
            <Link to="/about">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </Link>
          </li>
          <li className="size-4/12 sm:size-2/12 lg:size-2/12">
            <Link to="/">
              <img
                className="border rounded-full shadow-md"
                src="../../../public/assets/Guide_Textile_logo.png"
                alt="Guide Textile Logo"
              ></img>
            </Link>
          </li>
          <li className="px-8">
            <Link to="/setting">
              <FontAwesomeIcon icon={faGear} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderPhone;
