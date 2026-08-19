import React from 'react';
import SectionReveal from './SectionReveal';
import ZoomHeaderReveal from './ZoomHeaderReveal';
import { MessageSquareCode, Cpu, Download } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <MessageSquareCode size={20} style={{ color: 'var(--accent-lime)' }} />,
      title: "Provide Product Intent",
      text: "Describe your feature idea or system requirement in plain English. Include key business logic, user roles, or workflow constraints."
    },
    {
      num: "02",
      icon: <Cpu size={20} style={{ color: 'var(--accent-lime)' }} />,
      title: "Synthesize & Deduplicate",
      text: "BLUEPRINTR checks Redis cache for prompt hashes to avoid redundant generation and runs artifact synthesis with schema guardrails."
    },
    {
      num: "03",
      icon: <Download size={20} style={{ color: 'var(--accent-lime)' }} />,
      title: "Receive Engineering Contracts",
      text: "Copy formatted Feature Spec docs, Express REST route contracts, Mongoose document schemas, and controller starter code."
    }
  ];

  return (
    <section className="section stack-card" id="how-it-works" aria-label="How It Works">
      <div className="container">
        <SectionReveal>
          <div className="section-header">
            <div className="section-tag">
              <Cpu size={14} />
              <span>How It Works</span>
            </div>
            <ZoomHeaderReveal>
              <h2 className="section-title">
                THREE STEPS <span className="section-serif-italic">from idea</span> TO CODE.
              </h2>
            </ZoomHeaderReveal>
            <p className="section-subtitle">
              Streamlined 3-step workflow to go from feature concept to structured engineering artifacts.
            </p>
          </div>
        </SectionReveal>

        <div className="steps-wrapper">
          {steps.map((step, idx) => (
            <SectionReveal key={idx} delayMs={idx * 100}>
              <div className="step-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="step-number" aria-hidden="true">{step.num}</div>
                  <div style={{ padding: '8px', background: 'rgba(255,252,236,0.04)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
