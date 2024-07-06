import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const SettingScreen: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen ">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
          <form className="w-1/3">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
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

export default SettingScreen;
