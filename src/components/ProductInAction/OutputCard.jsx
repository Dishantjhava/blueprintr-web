import React, { useState } from 'react';
import { FileText, Code2, Database, Copy, Check } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function OutputCard({ type, data, isVisible, delayMs }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('schema');

  const handleCopy = () => {
    let textToCopy = '';
    if (type === 'spec') textToCopy = data.content;
    else if (type === 'api') textToCopy = JSON.stringify(data.endpoints, null, 2);
    else textToCopy = activeTab === 'schema' ? data.schemaCode : data.controllerCode;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    if (type === 'spec') return <FileText size={16} style={{ color: 'var(--accent-lime)' }} />;
    if (type === 'api') return <Code2 size={16} style={{ color: 'var(--accent-lime)' }} />;
    return <Database size={16} style={{ color: 'var(--accent-lime)' }} />;
  };

  return (
    <SpotlightCard
      className={`output-card ${isVisible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${delayMs}ms` }}
      spotlightColor="rgba(195, 237, 161, 0.12)"
    >
      <div className="card-top-bar">
        <div className="card-top-title">
          {getIcon()}
          <span>{data.title}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {type === 'db' && (
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,252,236,0.05)', padding: '2px', borderRadius: '4px' }}>
              <button 
                onClick={() => setActiveTab('schema')}
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: activeTab === 'schema' ? 'rgba(195, 237, 161, 0.2)' : 'transparent',
                  color: activeTab === 'schema' ? 'var(--accent-lime)' : 'var(--text-muted)'
                }}
              >
                Mongoose
              </button>
              <button 
                onClick={() => setActiveTab('controller')}
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: activeTab === 'controller' ? 'rgba(195, 237, 161, 0.2)' : 'transparent',
                  color: activeTab === 'controller' ? 'var(--accent-lime)' : 'var(--text-muted)'
                }}
              >
                Controller
              </button>
            </div>
          )}
          <button 
            onClick={handleCopy} 
            title="Copy snippet" 
            style={{ color: copied ? 'var(--accent-lime)' : 'var(--text-muted)', padding: '4px' }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div className="card-content-area">
        {type === 'spec' && (
          <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
            {data.content}
          </div>
        )}

        {type === 'api' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.endpoints.map((ep, idx) => (
              <div key={idx} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="mono-badge lime">
                    {ep.method}
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{ep.path}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{ep.summary}</div>
                <pre style={{ fontSize: '0.71875rem', color: 'var(--accent-lime)', margin: 0 }}>{ep.response}</pre>
              </div>
            ))}
          </div>
        )}

        {type === 'db' && (
          <pre className="code-snippet">
            {activeTab === 'schema' ? data.schemaCode : data.controllerCode}
          </pre>
        )}
      </div>
    </SpotlightCard>
  );
}
