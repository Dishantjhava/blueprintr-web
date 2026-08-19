import React, { useState } from 'react';
import { Code2, Database, LayoutGrid } from 'lucide-react';

export default function InteractiveDashboardPreview() {
  const [activeTab, setActiveTab] = useState('api');

  return (
    <div className="dashboard-preview-box">
      <div className="dash-nav" role="tablist" aria-label="Architecture Inspectors">
        <button
          role="tab"
          aria-selected={activeTab === 'api'}
          aria-controls="panel-api"
          id="tab-api"
          className={`dash-tab ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          <Code2 size={16} />
          <span>API Contract Viewer</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'schema'}
          aria-controls="panel-schema"
          id="tab-schema"
          className={`dash-tab ${activeTab === 'schema' ? 'active' : ''}`}
          onClick={() => setActiveTab('schema')}
        >
          <Database size={16} />
          <span>Mongoose Schema View</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'tasks'}
          aria-controls="panel-tasks"
          id="tab-tasks"
          className={`dash-tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <LayoutGrid size={16} />
          <span>Execution Task Board</span>
        </button>
      </div>

      <div className="dash-body">
        {activeTab === 'api' && (
          <div id="panel-api" role="tabpanel" aria-labelledby="tab-api">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Generated REST Endpoints (Express Router)
              </span>
              <span className="mono-badge emerald">API Contract</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px 16px', background: 'var(--bg-code)', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="mono-badge amber">POST</span>
                  <code style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>/api/v1/blueprints/generate</code>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auth: Bearer JWT</span>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--bg-code)', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="mono-badge emerald">GET</span>
                  <code style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>/api/v1/blueprints/:id</code>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cache: Redis Hit</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schema' && (
          <div id="panel-schema" role="tabpanel" aria-labelledby="tab-schema">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                MongoDB Document Model (`Blueprint.js`)
              </span>
              <span className="mono-badge amber">Mongoose Schema</span>
            </div>
            <pre className="code-snippet" style={{ background: 'var(--bg-code)', padding: '16px', borderRadius: '8px', fontSize: '0.8125rem', overflowX: 'auto' }}>
{`const BlueprintSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  promptHash: { type: String, required: true, unique: true },
  artifacts: {
    spec: String,
    apiContract: mongoose.Schema.Types.Mixed,
    mongooseSchema: String
  },
  cached: { type: Boolean, default: false }
}, { timestamps: true });`}
            </pre>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div id="panel-tasks" role="tabpanel" aria-labelledby="tab-tasks">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Execution Pipeline Task Status
              </span>
              <span className="mono-badge emerald">Pipeline Completed</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'var(--bg-code)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Task #1</div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Prompt Hash Check</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '8px' }}>✓ Redis Cache Checked</div>
              </div>
              <div style={{ padding: '14px', background: 'var(--bg-code)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Task #2</div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Artifact Generation</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', marginTop: '8px' }}>✓ Synthesis Complete</div>
              </div>
              <div style={{ padding: '14px', background: 'var(--bg-code)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Task #3</div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Schema Validation</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '8px' }}>✓ Guardrails Passed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
