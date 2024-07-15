import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const AboutScreen: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToContact) {
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen pt-12 my-36 mx-8">
        <div className="flex flex-col justify-center items-center ">
          <h2 className="font-bold text-3xl text-white mb-4 text-center">
            A Propos de Guide Textile
          </h2>
          <div className="text-justify lg:mx-20">
            <p className="my-3">
              Bienvenue sur notre application de guide textile, votre source
              fiable pour tout ce qui concerne les textiles. Notre mission est
              de fournir des informations complètes et accessibles pour vous
              aider à mieux comprendre les différents types de tissus, leurs
              utilisations et leurs entretiens.
            </p>
            <p className="my-3">
              Imaginez que vous avez une chute de tissu et que vous souhaitez en
              faire un projet, mais vous ne savez pas encore quel projet
              choisir. Notre application vous propose des projets adaptés à
              votre tissu. De plus, vous avez la possibilité de faire des
              recherches par projet. Par exemple, si un projet vous intéresse
              mais que vous ne savez pas quel tissu utiliser, notre application
              vous recommande des tissus adaptés à ce projet.
            </p>
            <p className="my-3">
              Cette application a été conçue et pensée pour les couturiers et
              couturières par une couturière, afin de savoir quels projets
              réaliser avec certains tissus et quels tissus choisir en fonction
              du projet que vous avez en tête, ou tout simplement pour chercher
              de l'inspiration.
            </p>
          </div>
          <h2 className="font-bold text-3xl text-white my-4">Notre Histoire</h2>
          <p className="text-justify lg:mx-20">
            L'idée du guide textile est née de ma passion pour les tissus et la
            couture. Constatant le manque d'informations centralisées et
            accessibles sur les textiles, et étant moi-même en constante
            recherche d'informations sur ce sujet, j'ai décidé de créer une
            ressource complète pour les amateurs et les professionnels. En tant
            que couturière toujours en apprentissage, j'ai ressenti le besoin
            d'une telle plateforme pour améliorer mes connaissances et partager
            ces informations précieuses avec la communauté.
          </p>
          <h2 className="font-bold text-3xl text-white my-4">
            Fonctionnalités
          </h2>
          <div className="flex flex-col text-center lg:mx-20">
            <div className="flex flex-col m-1 ">
              <h2>Recherche par Textile</h2>
              <p className="border-2 p-4 rounded-lg bg-lightBackground">
                Notre application permet de rechercher facilement différents
                types de tissus. Utilisez notre barre de recherche pour trouver
                des informations détaillées sur chaque tissu.
              </p>
            </div>
            <div className="flex flex-col m-1 ">
              <h2>Guides d'Entretien</h2>
              <p className="border-2 p-4 rounded-lg bg-lightBackground">
                Chaque fiche de tissu est accompagnée de guides d'entretien
                détaillés, vous aidant à maintenir vos textiles en parfait état.
              </p>
            </div>
            <div className="flex flex-col m-1 ">
              <h2>Recherche par Produits</h2>
              <p className="border-2 p-4 rounded-lg bg-lightBackground">
                Nous proposons des recommandations de produits et des projets
                associés pour chaque type de tissu, facilitant ainsi vos choix
                et inspirations pour vos créations.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl font-bold my-4 text-white">Contactez-nous</h3>
          <p className="text-justify lg:mx-20">
            Nous aimerions avoir de vos nouvelles. Si vous avez des questions,
            des suggestions ou des commentaires, n'hésitez pas à nous contacter.
          </p>
          <form
            className="flex flex-col justify-center items-center p-8 rounded-lg bg-lightBackgroundCream dark:bg-darkBackgroundRosy shadow-md mt-4 sm:w-80"
            id="contact-form"
          >
            <div className="">
              <label
                htmlFor="name"
                className="block text-brown dark:text-white font-bold mb-2"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="bg-white dark:bg-lightBackgroundCream rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-darkBackgroundCream focus:ring-brown dark:focus:ring-white caret-brown dark:caret-darkBackgroundRosy dark:text-brown sm:w-64"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-brown dark:text-white font-bold my-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white dark:bg-lightBackgroundCream rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-darkBackgroundCream focus:ring-brown dark:focus:ring-white caret-brown dark:caret-darkBackgrouondRosy dark:text-brown sm:w-64"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-brown dark:text-white font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="bg-white dark:bg-lightBackgroundCream rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-darkBackgroundCream focus:ring-brown dark:focus:ring-white caret-brown dark:caret-darkBackgrouondRosy dark:text-brown sm:w-64"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="bg-lightPink text-darkBrown py-2 px-4 rounded-md hover:bg-pink hover:text-white focus:outline-none shadow-md dark:text-white hover:dark:bg-cream hover:dark:text-brown"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
