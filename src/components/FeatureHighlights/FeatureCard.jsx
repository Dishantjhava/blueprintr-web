import React from 'react';

export default function FeatureCard({ icon, title, description, metricTag }) {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
      {metricTag && (
        <div className="feature-metric-tag">
          {metricTag}
        </div>
      )}
    </div>
  );
}
