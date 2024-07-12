// src/config/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: {
        welcome: 'Welcome to our Textile Guide',
        intro:
          'Here you can find which textile suits best according to the project you want to carry out in the textile world.',
        search_by: 'Search by:',
        projects: 'Projects',
        fabrics: 'Fabrics',
      },
      header: {
        about: 'About',
        projects: 'Projects',
        fabrics: 'Fabrics',
        change_language: 'Change Language',
      },
      footer: {
        text: 'Textile-Guide. All rights reserved',
      },
    },
  },
  fr: {
    translation: {
      home: {
        welcome: 'Bienvenue dans le Guide des Textiles',
        intro:
          "Ici tu peux trouver quel textile convient le mieux selon le projet que tu souhaites réaliser dans l'univers du textile.",
        search_by: 'Recherché par:',
        projects: 'Projets',
        fabrics: 'Tissus',
      },
      header: {
        about: 'À propos',
        projects: 'Projets',
        fabrics: 'Tissus',
        change_language: 'Changer de langue',
      },
      footer: {
        text: 'Textile-Guide. Tous droits réservés',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // Langue par défaut
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React gère déjà la protection contre les XSS
  },
});

export default i18n;
