import React from 'react';
import FeatureCard from './FeatureCard';
import InteractiveDashboardPreview from './InteractiveDashboardPreview';
import SectionReveal from '../SectionReveal';
import ZoomHeaderReveal from '../ZoomHeaderReveal';
import { Layers, Database, Zap, LayoutGrid, ShieldCheck } from 'lucide-react';

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Layers size={24} />,
      title: "Single-Prompt Multi-Artifact Pipeline",
      description: "A single product prompt generates structured engineering artifacts: feature specs, REST contracts, Mongoose models, and starter controller logic.",
      metricTag: "Multi-Artifact Output"
    },
    {
      icon: <Database size={24} />,
      title: "Redis LLM Caching Layer",
      description: "In-memory Redis caching hashes prompt intent structures to bypass redundant LLM generation cycles and reduce compute overhead.",
      metricTag: "Redis Caching Layer"
    },
    {
      icon: <Zap size={24} />,
      title: "Optimized Generation Pipeline",
      description: "Parallelized architecture pipeline designed for fast iterative prototyping. Get your complete initial backend contracts quickly.",
      metricTag: "Responsive Pipeline"
    },
    {
      icon: <LayoutGrid size={24} />,
      title: "Interactive Architecture Viewer",
      description: "Inspection views for API contract specifications, MongoDB/Mongoose document models, and execution task tracking.",
      metricTag: "API + Schema + Board"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Structured Engineering Guardrails",
      description: "Built-in rate limiting concepts, ownership verification checks, schema input validation, and structured async error handling.",
      metricTag: "Built-in Guardrails"
    }
  ];

  return (
    <section className="section stack-card" id="features" aria-label="Architecture Features">
      <div className="container">
        <SectionReveal>
          <div className="section-header">
            <div className="section-tag">
              <ShieldCheck size={14} />
              <span>Architecture Features</span>
            </div>
            <ZoomHeaderReveal>
              <h2 className="section-title">
                BUILT FOR ENGINEERS <span className="section-serif-italic">who want to build,</span> NOT SCAFFOLD.
              </h2>
            </ZoomHeaderReveal>
            <p className="section-subtitle">
              BLUEPRINTR generates structured, maintainable engineering contracts and schema models you can build on directly.
            </p>
          </div>
        </SectionReveal>

        <div className="features-grid">
          {features.map((feat, index) => (
            <SectionReveal key={index} delayMs={index * 80}>
              <FeatureCard {...feat} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delayMs={200}>
          <div style={{ marginTop: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="mono-badge amber">INTERACTIVE PRODUCT PREVIEW</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '8px', color: 'var(--text-primary)' }}>
                Explore Generated Artifact Inspectors
              </h3>
            </div>
            <InteractiveDashboardPreview />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
