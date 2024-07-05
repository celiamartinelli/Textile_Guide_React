import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex font-thasadith-bold font-bold relative">
      <nav className="fixed top-0 left-0 right-0">
        <ul className="flex flex-row w-screen h-24 justify-around text-white text-xl font-bold bg-sage items-center">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Projets</Link>
          </li>
          <li className="size-5/12 absolute ">
            <Link to="/">
              <img
                className="border rounded-full shadow-md"
                src="../../../public/assets/Guide_Textile_logo.png"
                alt="Guide Textile Logo"
              ></img>
            </Link>
          </li>
          <li>
            <Link to="/fabrics">Tissus</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
