import React from 'react';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default function InfoScreen() {
  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen ">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1>InfoScreen</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
