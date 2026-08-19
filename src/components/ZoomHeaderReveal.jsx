import React, { useRef, useState, useEffect } from 'react';

export default function ZoomHeaderReveal({ children, className = '', style = {}, delayMs = 0 }) {
  const domRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsZoomed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsZoomed(true);
          } else {
            setIsZoomed(false); // Reset when leaving viewport for slow smooth bidirectional re-triggering
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`zoom-header-wrapper ${isZoomed ? 'zoom-active' : ''} ${className}`}
      style={{
        transitionDelay: isZoomed ? `${delayMs}ms` : '0ms',
        ...style
      }}
    >
      {children}
    </div>
  );
}
