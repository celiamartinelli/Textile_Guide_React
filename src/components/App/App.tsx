import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '@/pages/HomeScreen';
import FabricScreen from '@/pages/FabricScreen';
import ProductScreen from '@/pages/ProductScreen';
import InfoScreen from '@/pages/InfoScreen';
import SettingScreen from '@/pages/SettingScreen';
import OneFabricScreen from '@/pages/OneFabricScreen';
import OneProductScreen from '@/pages/OneProdutScreen';

function App() {
  return (
    <div className="bg-lightsage">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/fabrics" element={<FabricScreen />} />
        <Route path="/fabrics/:fabricId" element={<OneFabricScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/products/:productId" element={<OneProductScreen />} />
        <Route path="/about" element={<InfoScreen />} />
        <Route path="/setting" element={<SettingScreen />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
