import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from '../components/Modal/Modal';

const AboutScreen: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (location.state?.scrollToContact) {
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Logique pour envoyer le formulaire
  //   setIsModalOpen(true);
  //   if (formRef.current) {
  //     formRef.current.reset();
  //   }
  //   const formData = new FormData(event.currentTarget);

  //   fetch('/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: new URLSearchParams(formData as any).toString(),
  //   })
  //     .then(() => {
  //       setIsModalOpen(true);
  //       if (formRef.current) {
  //         formRef.current.reset();
  //       }
  //     })
  //     .catch((error) => alert(error));
  // };

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen pt-12 my-36 mx-8">
        <div className="flex flex-col justify-center items-center ">
          <h2 className="font-bold text-3xl text-white mb-4 text-center">
            {t('about.title')}
          </h2>
          <div className="text-justify lg:mx-20">
            <p className="my-3">{t('about.p1')}</p>
            <p className="my-3">{t('about.p2')}</p>
            <p className="my-3">{t('about.p3')}</p>
          </div>
          <h2 className="font-bold text-3xl text-white my-4">
            {t('about.title2')}
          </h2>
          <p className="text-justify lg:mx-20">{t('about.p4')}</p>
          <h2 className="font-bold text-3xl text-white my-4">
            {t('about.title3')}
          </h2>
          <p className="text-justify lg:mx-20">{t('about.p5')}</p>
          <div className="flex flex-col text-center lg:mx-20">
            <div className="flex flex-col m-1 ">
              <h2 className="font-bold text-xl text-white my-4">
                {t('about.title4')}
              </h2>
              <p className="border-2 p-4 text-white  rounded-lg bg-lightBackground dark:bg-darkPruneBG">
                {t('about.p6')}
              </p>
            </div>
            <div className="flex flex-col m-1 ">
              <h2 className="font-bold text-xl text-white my-4">
                {t('about.title5')}
              </h2>
              <p className="border-2 p-4 text-white  rounded-lg bg-lightBackground dark:bg-darkPruneBG">
                {t('about.p7')}
              </p>
            </div>
            <div className="flex flex-col m-1 ">
              <h2 className="font-bold text-xl text-white my-4">
                {t('about.title6')}
              </h2>
              <p className="border-2 p-4 rounded-lg text-white  bg-lightBackground dark:bg-darkPruneBG">
                {t('about.p8')}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center"
          id="contact-form"
        >
          <h3 className="text-3xl font-bold my-4 text-white">
            {t('about.title7')}
          </h3>
          <p className="text-justify lg:mx-20">{t('about.p9')}</p>
          <form
            className="flex flex-col justify-center items-center p-8 rounded-lg bg-lightBackgroundCream dark:bg-darkSage shadow-md mt-4 sm:w-80"
            id="form"
            name="contact"
            method="POST"
            action="/about" // URL de redirection après soumission
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            // onSubmit={handleSubmit}
            ref={formRef}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Ne pas remplir ce champ : <input name="bot-field" />
              </label>
            </p>
            <div className="">
              <label
                htmlFor="name"
                className="block text-brown dark:text-white font-bold mb-2"
              >
                {t('about.form1')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="bg-white dark:bg-sage rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-darkBackgroundCream focus:ring-brown dark:focus:ring-white caret-brown dark:text-black shadow-inner sm:w-64"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-brown dark:text-white font-bold my-2"
              >
                {t('about.form2')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="bg-white dark:bg-sage rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-darkBackgroundCream focus:ring-brown dark:focus:ring-white caret-brown dark:text-black shadow-inner sm:w-64"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-brown dark:text-white font-bold mb-2"
              >
                {t('about.form3')}
              </label>
              <textarea
                id="message"
                name="message"
                className="bg-white dark:bg-sage rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-darkBackgroundCream focus:ring-brown dark:focus:ring-white caret-brown dark:text-black shadow-inner sm:w-64"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="hover:bg-lightPink hover:dark:bg-darkPrune text-darkBrown py-2 px-4 rounded-md bg-pink hover:text-white focus:outline-none shadow-md hover:dark:text-white dark:bg-cream dark:text-brown"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p>Votre message a été envoyé avec succès !</p>
        </Modal>
      )}
    </div>
  );
};

export default AboutScreen;
