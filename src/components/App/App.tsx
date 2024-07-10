import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomeScreen from '@/pages/HomeScreen';
import FabricScreen from '@/pages/FabricScreen';
import ProductScreen from '@/pages/ProductScreen';
import OneFabricScreen from '@/pages/OneFabricScreen';
import OneProductScreen from '@/pages/OneProdutScreen';
import AboutScreen from '@/pages/AboutScreen';
import { DarkModeProvider } from './DarkModeContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // Appliquer ou retirer la classe dark-mode du corps du document
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);
  return (
    <DarkModeProvider>
      <div className={`bg-lightsage ${isDarkMode ? 'dark:bg-sage' : ''}`}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/fabrics" element={<FabricScreen />} />
          <Route path="/fabrics/:fabricId" element={<OneFabricScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/products/:productId" element={<OneProductScreen />} />
          <Route path="/about" element={<AboutScreen />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
