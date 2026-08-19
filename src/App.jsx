import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductInAction from './components/ProductInAction/ProductInAction';
import FeatureHighlights from './components/FeatureHighlights/FeatureHighlights';
import HowItWorks from './components/HowItWorks';
import HonestBuildNote from './components/HonestBuildNote';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

import './styles/global.css';
import './styles/components.css';

export default function App() {
  return (
    <div className="app-layout">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ProductInAction />
        <FeatureHighlights />
        <HowItWorks />
        <HonestBuildNote />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
