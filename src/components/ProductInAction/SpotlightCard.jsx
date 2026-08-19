import React, { useRef, useState } from 'react';

export default function SpotlightCard({ children, className = '', style = {}, spotlightColor = 'rgba(195, 237, 161, 0.12)', ...props }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: rect.width / 2, y: rect.height / 2 });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`spotlight-card-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: '10px',
        ...style
      }}
      {...props}
    >
      {/* Subtle Radial Cursor Spotlight Layer */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: opacity,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          zIndex: 1
        }}
        aria-hidden="true"
      />
      
      {/* Card Content Surface */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
