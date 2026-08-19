import React from 'react';
import SectionReveal from './SectionReveal';
import ZoomHeaderReveal from './ZoomHeaderReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const demoElement = document.getElementById('product-demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section stack-card" id="final-cta" style={{ paddingTop: '32px' }}>
      <div className="container">
        <SectionReveal>
          <div className="final-cta-box">
            <div className="ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="section-tag" style={{ marginBottom: '20px' }}>
                <Sparkles size={14} />
                <span>Ready to Build</span>
              </div>
              
              <ZoomHeaderReveal>
                <h2 className="final-cta-title" style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontWeight: 900 }}>
                  STOP SCAFFOLDING. <span className="section-serif-italic">start</span> BUILDING.
                </h2>
              </ZoomHeaderReveal>
              
              <p className="final-cta-sub">
                Experience single-prompt architecture generation with Redis caching and production-ready Mongoose schemas.
              </p>

              <a href="#product-demo" onClick={scrollToDemo} className="btn-primary" id="final-primary-cta">
                <span>See it turn an idea into a spec</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
