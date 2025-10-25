import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
