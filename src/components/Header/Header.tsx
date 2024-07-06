import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDesktop from './HeaderDesktop';
import HeaderPhone from './HeaderPhone';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 429);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 429);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <div>{isMobile ? <HeaderPhone /> : <HeaderDesktop />}</div>;
};

export default Header;
