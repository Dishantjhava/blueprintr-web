import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="brand-icon-box" style={{ width: '28px', height: '28px' }}>
            <Cpu size={16} />
          </div>
          <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>BLUEPRINTR</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} AI Product Execution Copilot</span>
        </div>

        <div className="footer-tags">
          <span className="mono-badge">Node.js</span>
          <span className="mono-badge">Express</span>
          <span className="mono-badge lime">MongoDB / Mongoose</span>
          <span className="mono-badge lime">Redis Cache</span>
          <span className="mono-badge">Vite + React</span>
        </div>
      </div>
    </footer>
  );
}
