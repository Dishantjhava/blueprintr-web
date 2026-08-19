import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Check, FileText, Code2, Database } from 'lucide-react';

export default function HeroTransformationVisual() {
  const panelRef = useRef(null);
  const fullPrompt = "Build a support ticket system with priority tagging and status lifecycle hooks.";
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [revealStep, setRevealStep] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedText(fullPrompt);
      setIsTypingDone(true);
      setRevealStep(3);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            setTypedText('');
            setIsTypingDone(false);
            setRevealStep(0);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isInView || isTypingDone) return;

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= fullPrompt.length) {
        setTypedText(fullPrompt.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);
        
        // Stagger artifact reveals: 150ms step 1, 300ms step 2, 450ms step 3
        setTimeout(() => setRevealStep(1), 150);
        setTimeout(() => setRevealStep(2), 300);
        setTimeout(() => setRevealStep(3), 450);
      }
    }, 18);

    return () => clearInterval(typingInterval);
  }, [isInView, isTypingDone]);

  return (
    <div ref={panelRef} className="hero-transform-panel hero-fade-in" style={{ animationDelay: '540ms' }} aria-label="Product Execution Preview">
      <div className="hero-transform-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot red"></span>
          <span className="window-dot yellow"></span>
          <span className="window-dot green"></span>
        </div>
        <div className="hero-transform-title">
          <Terminal size={12} />
          <span>IDEA → ARCHITECTURE SYNTHESIS</span>
        </div>
        <span className="mono-badge lime" style={{ fontSize: '0.6875rem' }}>PRODUCT PREVIEW</span>
      </div>

      <div className="hero-transform-body">
        <div className="hero-prompt-line">
          <span className="prompt-symbol">$</span>
          <span style={{ color: 'var(--text-muted)' }}>blueprintr generate --prompt "</span>
          <span style={{ color: 'var(--text-primary)' }}>{typedText}</span>
          <span style={{ color: 'var(--text-muted)' }}>"</span>
          {!isTypingDone && <span className="typing-cursor" aria-hidden="true"></span>}
        </div>

        <div className="hero-artifacts-row">
          <div className={`hero-artifact-chip ${revealStep >= 1 ? 'show' : ''}`}>
            <Check size={13} style={{ color: 'var(--accent-lime)' }} />
            <FileText size={13} style={{ color: 'var(--text-secondary)' }} />
            <span>Feature Spec</span>
          </div>

          <div className={`hero-artifact-chip ${revealStep >= 2 ? 'show' : ''}`}>
            <Check size={13} style={{ color: 'var(--accent-lime)' }} />
            <Code2 size={13} style={{ color: 'var(--text-secondary)' }} />
            <span>REST API Contract</span>
          </div>

          <div className={`hero-artifact-chip ${revealStep >= 3 ? 'show' : ''}`}>
            <Check size={13} style={{ color: 'var(--accent-lime)' }} />
            <Database size={13} style={{ color: 'var(--text-secondary)' }} />
            <span>Mongoose Schema</span>
          </div>
        </div>
      </div>
    </div>
  );
}
