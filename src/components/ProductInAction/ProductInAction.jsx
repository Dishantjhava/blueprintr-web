import React, { useState, useEffect, useRef } from 'react';
import TypewriterPrompt from './TypewriterPrompt';
import OutputCard from './OutputCard';
import ZoomHeaderReveal from '../ZoomHeaderReveal';
import { sampleGenerationData } from './sampleData';
import { Terminal, Sparkles } from 'lucide-react';

export default function ProductInAction() {
  const sectionRef = useRef(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsIntersected(true);
      setIsTypingDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
          } else {
            setIsIntersected(false);
            setIsTypingDone(false); // Reset to enable bidirectional animation when scrolling back upwards
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section product-action-section stack-card" id="product-demo" ref={sectionRef} aria-label="Product Demonstration">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Product In Action</span>
          </div>
          <ZoomHeaderReveal>
            <h2 className="section-title">
              SINGLE PROMPT. <span className="section-serif-italic">multiple production</span> ARTIFACTS.
            </h2>
          </ZoomHeaderReveal>
          <p className="section-subtitle">
            Demonstration of BLUEPRINTR translating high-level product intent into structured engineering contracts and Mongoose models.
          </p>
        </div>

        <div className="demo-window">
          <div className="demo-header">
            <div className="window-dots">
              <span className="window-dot red" aria-hidden="true"></span>
              <span className="window-dot yellow" aria-hidden="true"></span>
              <span className="window-dot green" aria-hidden="true"></span>
            </div>
            <div className="demo-title-bar">
              <Terminal size={13} />
              <span>blueprintr-execution-engine</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="mono-badge emerald">REST API</span>
              <span className="mono-badge amber">MONGOOSE</span>
            </div>
          </div>

          <TypewriterPrompt
            fullText={sampleGenerationData.promptText}
            isStarted={isIntersected}
            onTypingComplete={() => setIsTypingDone(true)}
          />

          <div className="artifact-grid">
            <OutputCard
              type="spec"
              data={sampleGenerationData.artifacts.featureSpec}
              isVisible={isTypingDone}
              delayMs={0}
            />
            <OutputCard
              type="api"
              data={sampleGenerationData.artifacts.apiContract}
              isVisible={isTypingDone}
              delayMs={150}
            />
            <OutputCard
              type="db"
              data={sampleGenerationData.artifacts.databaseSchema}
              isVisible={isTypingDone}
              delayMs={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
