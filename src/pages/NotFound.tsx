import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '@/components/App/DarkModeContext';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const notFound = isDarkMode
    ? '../../../assets/404_dark.png'
    : '../../../assets/404.png';
  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen pt-12 my-36">
        <div className="flex flex-col justify-center items-center mx-8">
          <button
            type="button"
            className="bg-lightPink text-darkBrown py-2 px-4 rounded-md hover:bg-pink hover:text-white focus:outline-none shadow-md "
            onClick={() => window.history.back()}
          >
            Retour
          </button>
          <img src={notFound} alt="404" className="w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
