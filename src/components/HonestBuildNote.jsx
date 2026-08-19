import React from 'react';
import SectionReveal from './SectionReveal';
import { Code } from 'lucide-react';

export default function HonestBuildNote() {
  return (
    <section className="section stack-card" id="build-note" aria-label="Build Note">
      <div className="container">
        <SectionReveal>
          <div className="build-note-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="mono-badge lime">BUILDER'S NOTE</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>• Authentic Reflection</span>
            </div>

            <blockquote className="build-note-quote">
              "I built BLUEPRINTR because I got tired of wasting the first two hours of every feature build on repetitive scaffolding — writing Mongoose models, designing Express contracts, and drafting feature specs by hand. Most AI tools give you unconstrained code snippets that break in production. BLUEPRINTR focuses on structured architectural contracts with Redis caching and real error guardrails, so you can go from an idea to a clean codebase before your coffee gets cold."
            </blockquote>

            <div className="build-note-author">
              <div className="author-avatar">
                <Code size={20} />
              </div>
              <div className="author-info">
                <span className="author-name">Creator of BLUEPRINTR</span>
                <span className="author-role">Full-Stack Engineer & Product Builder</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
