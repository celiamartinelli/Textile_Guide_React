import React, { useEffect, useRef } from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen pt-12 my-36">
        <div className="flex flex-col justify-center items-center mx-8">
          <h1 className=" font-bold text-3xl text-white mb-10">404</h1>

          <button
            type="button"
            className="bg-lightPink text-darkBrown py-2 px-4 rounded-md hover:bg-pink hover:text-white focus:outline-none shadow-md "
            onClick={() => window.history.back()}
          >
            Retour
          </button>
          <img src="../assets/404.png" alt="404" className="w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
