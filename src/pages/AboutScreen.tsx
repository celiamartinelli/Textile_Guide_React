import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    <div>
      <Header />
      <div className="flex flex-col h-screen pt-12 my-36">
        <div className="flex flex-col justify-center items-center mx-8">
          <h1 className=" font-bold text-3xl text-white">
            A Propos de Guide Textile
          </h1>
          <p>
            Cette application a été conçue et pensée pour les couturier(ères)
            par une couturière
          </p>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dolore harum ex rerum doloremque autem, ipsa ducimus facilis
            consectetur repellat accusantium vero atque, quisquam explicabo
            fugit libero eveniet voluptas esse! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ratione dolore harum ex rerum
            doloremque autem, ipsa ducimus facilis consectetur repellat
            accusantium vero atque, quisquam explicabo fugit libero eveniet
            voluptas esse! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ratione dolore harum ex rerum doloremque autem, ipsa ducimus
            facilis consectetur repellat accusantium vero atque, quisquam
            explicabo fugit libero eveniet voluptas esse! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ratione dolore harum ex rerum
            doloremque autem, ipsa ducimus facilis consectetur repellat
            accusantium vero atque, quisquam explicabo fugit libero eveniet
            voluptas esse!
          </p>
          <p>Une api a été conçue afin d'effectuer les recherche souhaité</p>
        </div>
        <div className="flex flex-col justify-center items-center  ">
          <h3 className="text-3xl font-bold mb-4 text-white">Contactez-nous</h3>
          <form
            className="flex flex-col justify-center items-center p-5 rounded-lg bg-cream shadow-md w-80"
            id="contact-form"
          >
            <div className="">
              <label htmlFor="name" className="block text-brown font-bold mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="bg-white rounded-md p-2 w-64"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-brown font-bold my-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white rounded-md p-2 w-64"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-brown font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="bg-white rounded-md p-2 w-64 "
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-lightPink text-darkBrown py-2 px-4 rounded-md hover:bg-pink hover:text-white focus:outline-none shadow-md "
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutScreen;
