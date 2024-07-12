// src/components/LanguageSwitcher.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center">
      <button className="" onClick={toggleLanguage}>
        <img
          className="size-5"
          src={
            language === 'en'
              ? '/assets/flag/united-kingdom.png'
              : '/assets/flag/france.png'
          }
          alt={language === 'en' ? 'English' : 'Français'}
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
