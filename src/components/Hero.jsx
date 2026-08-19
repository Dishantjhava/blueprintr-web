import React from 'react';
import { ArrowRight, Terminal, Zap, Shield, Database } from 'lucide-react';
import HeroTransformationVisual from './HeroTransformationVisual';
import TrueFocus from './ReactBits/TrueFocus';

export default function Hero() {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const demoElement = document.getElementById('product-demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section stack-card" id="hero" aria-label="Introduction">
      <div className="ambient-glow" style={{ top: '-100px', left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-badge hero-fade-in" style={{ animationDelay: '0ms' }}>
          <Terminal size={14} />
          <span>AI Product Execution Copilot</span>
        </div>

        <h1 className="hero-title hero-fade-in" style={{ animationDelay: '120ms' }}>
          <span className="hero-serif-italic">from idea to</span>{' '}
          <TrueFocus
            sentence="ARCHITECTURE"
            manualMode={false}
            blurAmount={4}
            borderColor="#C3EDA1"
            glowColor="rgba(195, 237, 161, 0.6)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.2}
          />
          <br />
          <span className="hero-serif-italic">before your coffee</span>{' '}
          <span className="gradient-text">
            <TrueFocus
              sentence="GETS COLD"
              manualMode={false}
              blurAmount={4}
              borderColor="#C3EDA1"
              glowColor="rgba(195, 237, 161, 0.6)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
            />
          </span>
        </h1>

        <p className="hero-subcopy hero-fade-in" style={{ animationDelay: '240ms' }}>
          BLUEPRINTR turns a single prompt into feature specs, REST API contracts, database schemas, and starter code — so you spend your time building, not scaffolding.
        </p>

        <div className="hero-actions hero-fade-in" style={{ animationDelay: '360ms' }}>
          <a href="#product-demo" onClick={scrollToDemo} className="btn-primary" id="hero-primary-cta">
            <span>See it turn an idea into a spec</span>
            <ArrowRight size={18} />
          </a>
        </div>

        <HeroTransformationVisual />

        <div className="hero-chips hero-fade-in" style={{ animationDelay: '640ms' }}>
          <div className="chip-item">
            <span className="chip-dot" aria-hidden="true"></span>
            <span>Single-Prompt Multi-Artifact Pipeline</span>
          </div>
          <div className="chip-item">
            <Zap size={14} style={{ color: 'var(--accent-lime)' }} />
            <span>Redis Caching Layer</span>
          </div>
          <div className="chip-item">
            <Database size={14} style={{ color: 'var(--accent-lime)' }} />
            <span>Mongoose Schemas & Express REST Contracts</span>
          </div>
          <div className="chip-item">
            <Shield size={14} style={{ color: 'var(--accent-lime)' }} />
            <span>Guardrails & Ownership Checks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
