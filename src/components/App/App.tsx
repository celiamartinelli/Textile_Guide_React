import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomeScreen from '@/pages/HomeScreen';
import FabricScreen from '@/pages/FabricScreen';
import ProductScreen from '@/pages/ProductScreen';
import OneFabricScreen from '@/pages/OneFabricScreen';
import OneProductScreen from '@/pages/OneProdutScreen';
import AboutScreen from '@/pages/AboutScreen';
import { DarkModeProvider } from './DarkModeContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeaderDesktop from '../Header/HeaderDesktop';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <DarkModeProvider>
      <div className="bg-lightBackgroundLight dark:bg-darkBackgroundLight text-black dark:text-darkText min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/fabrics" element={<FabricScreen />} />
          <Route path="/fabrics/:fabricId" element={<OneFabricScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/products/:productId" element={<OneProductScreen />} />
          <Route path="/about" element={<AboutScreen />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;
