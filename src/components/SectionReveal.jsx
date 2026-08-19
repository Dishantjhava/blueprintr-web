import React, { useRef, useState, useEffect } from 'react';

export default function SectionReveal({ children, className = '', style = {}, delayMs = 0 }) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); // Reset when leaving viewport to enable bidirectional scroll reveal (upwards & downwards)
          }
        });
      },
      { threshold: 0.12 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`section-reveal ${isVisible ? 'reveal' : ''} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
        ...style
      }}
    >
      {children}
    </div>
  );
}
