import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex">
      <nav>
        <ul className="flex flex-row  w-screen justify-between text-white text-xl font-bold">
          <li>
            <Link to="/fabrics">Tissus</Link>
          </li>
          <li>
            <Link to="/products">Projets</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
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
