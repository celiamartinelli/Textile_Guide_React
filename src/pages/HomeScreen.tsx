import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaScroll } from 'react-icons/fa';
import { FaShirt } from 'react-icons/fa6';
import { IconBase } from 'react-icons';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useDarkMode } from '@/components/App/DarkModeContext';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const searchByProjectImg = isDarkMode
    ? '../../../assets/search_by_project_dark.png'
    : '../../../assets/search_by_project.png';
  const searchByFabricImg = isDarkMode
    ? '../../../assets/search_by_fabric_dark.png'
    : '../../../assets/search_by_fabric.png';

  return (
    <div className="pb-20">
      {/* <Header /> */}
      <div className="flex flex-col justify-center items-center min-h-screen mt-16">
        <div className="mb-5 text-center">
          <h1 className="pb-8 text-2xl font-bold">
            Bienvenue dans le
            <br /> Guide des Textiles
          </h1>
          <h2 className="text-darkBrown">
            Ici tu peux trouver quel textile convient le mieux selon le projet
            que tu souhaites realiser dans l'univers du textile.
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-darkBrown">Recherché par:</h3>
          <div className="flex flex-row m-2">
            <div
              className="flex flex-col justify-center items-center border rounded-md p-2 m-2 shadow-lg bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkBackground hover:dark:bg-darkBackgroundLightHover"
              onClick={() => {
                navigate('/products');
              }}
            >
              <h4>Projets</h4>
              <img
                className="w-36"
                src={searchByProjectImg}
                alt="search by project"
              />
            </div>
            <div
              className="flex flex-col justify-center items-center border rounded-md p-2 m-2 shadow-lg bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkBackground hover:dark:bg-darkBackgroundLightHover"
              onClick={() => {
                navigate('/fabrics');
              }}
            >
              <h4>Tissus</h4>
              <img
                className="w-36"
                src={searchByFabricImg}
                alt="search by project"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
