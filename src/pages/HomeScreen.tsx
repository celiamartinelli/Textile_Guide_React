import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaScroll } from 'react-icons/fa';
import { FaShirt } from 'react-icons/fa6';
import { IconBase } from 'react-icons';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <Header />
      <div className="flex flex-col justify-center items-center h-screen mt-16">
        <div className="mb-5 text-center">
          <h1 className="pb-8 text-2xl font-bold">
            Bienvenue dans le
            <br /> Guide des Textiles
          </h1>
          <h2 className="">
            Ici tu peux trouver quel textile convient le mieux selon le projet
            que tu souhaites realiser dans l'univers du textile.
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3>Recherché par:</h3>
          <div className="flex flex-row m-2">
            <div
              className="flex flex-col justify-center items-center border rounded-md p-2 m-2 shadow-lg bg-sage"
              onClick={() => {
                navigate('/products');
              }}
            >
              <h4>Projets</h4>
              <img
                className="w-36"
                src="../../../assets/search_by_project.png"
                alt="search by project"
              />
            </div>
            <div
              className="flex flex-col justify-center items-center border rounded-md p-2 m-2 shadow-lg bg-sage"
              onClick={() => {
                navigate('/fabrics');
              }}
            >
              <h4>Tissus</h4>
              <img
                className="w-36"
                src="../../../assets/search_by_fabric.png"
                alt="search by project"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
