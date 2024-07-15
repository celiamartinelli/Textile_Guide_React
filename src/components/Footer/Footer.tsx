import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterPhone from './FooterPhone';
import FooterDesktop from './FooterDesktop';

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 489);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 489);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <div>{isMobile ? <FooterPhone /> : <FooterDesktop />}</div>;
};

export default Footer;
