import React, { useState, useEffect } from 'react';
import { Cpu, ArrowRight, Menu, X } from 'lucide-react';
import Shuffle from './ReactBits/Shuffle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="brand-logo" aria-label="BLUEPRINTR Home">
          <div className="brand-icon-box">
            <Cpu size={20} />
          </div>
          <Shuffle
            text="BLUEPRINTR"
            tag="span"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
          />
        </a>

        <nav className="nav-links" aria-label="Desktop Navigation">
          <a href="#product-demo" onClick={(e) => scrollToSection(e, 'product-demo')} className="nav-link">Product In Action</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="nav-link">Architecture Features</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="nav-link">How It Works</a>
          <a href="#build-note" onClick={(e) => scrollToSection(e, 'build-note')} className="nav-link">Build Note</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a 
            href="#product-demo" 
            onClick={(e) => scrollToSection(e, 'product-demo')} 
            className="btn-primary" 
            style={{ padding: '8px 16px', fontSize: '0.875rem' }}
          >
            <span>See It In Action</span>
            <ArrowRight size={16} />
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-dropdown" role="navigation" aria-label="Mobile Navigation">
          <a href="#product-demo" onClick={(e) => scrollToSection(e, 'product-demo')} className="mobile-nav-link">Product In Action</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="mobile-nav-link">Architecture Features</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="mobile-nav-link">How It Works</a>
          <a href="#build-note" onClick={(e) => scrollToSection(e, 'build-note')} className="mobile-nav-link">Build Note</a>
        </div>
      )}
    </header>
  );
}
