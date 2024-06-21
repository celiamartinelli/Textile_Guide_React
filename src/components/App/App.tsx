import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '@/pages/HomeScreen';
import FabricScreen from '@/pages/FabricScreen';
import ProductScreen from '@/pages/ProductScreen';
import InfoScreen from '@/pages/InfoScreen';
import ContactScreen from '@/pages/ContactScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/fabrics" element={<FabricScreen />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="/about" element={<InfoScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
