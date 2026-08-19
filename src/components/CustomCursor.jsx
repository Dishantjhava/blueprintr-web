import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [sectionLabel, setSectionLabel] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const posRef = useRef({ x: -100, y: -100 });

  const updateCursorTarget = useCallback((x, y) => {
    if (x < 0 || y < 0) return;
    const target = document.elementFromPoint(x, y);
    if (!target) return;

    // Check section context for the 4 core sections
    const productSection = target.closest('#product-demo');
    const featuresSection = target.closest('#features');
    const howItWorksSection = target.closest('#how-it-works');
    const buildNoteSection = target.closest('#build-note');

    if (productSection) {
      setSectionLabel('PRODUCT IN ACTION');
    } else if (featuresSection) {
      setSectionLabel('ARCHITECTURE FEATURES');
    } else if (howItWorksSection) {
      setSectionLabel('HOW IT WORKS');
    } else if (buildNoteSection) {
      setSectionLabel('BUILD NOTE');
    } else {
      setSectionLabel('');
    }

    // Check interactive hover
    const isInteractive = target.closest(
      'a, button, input, textarea, select, .btn-primary, .nav-link, .dash-tab, .mono-badge, [role="button"]'
    );
    setIsHovered(!!isInteractive);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current = { x, y };
      setPosition({ x, y });
      setIsVisible(true);
      updateCursorTarget(x, y);
    };

    const handleScroll = () => {
      if (posRef.current.x >= 0 && posRef.current.y >= 0) {
        updateCursorTarget(posRef.current.x, posRef.current.y);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [updateCursorTarget]);

  // Smooth lerp animation frame loop
  useEffect(() => {
    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateTrailer = () => {
      const targetX = posRef.current.x;
      const targetY = posRef.current.y;
      setTrailerPos((prev) => ({
        x: lerp(prev.x, targetX, 0.25),
        y: lerp(prev.y, targetY, 0.25)
      }));
      animationFrameId = requestAnimationFrame(animateTrailer);
    };

    animationFrameId = requestAnimationFrame(animateTrailer);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* Small Precision Cursor Dot */}
      {!sectionLabel && (
        <div
          className="custom-cursor-dot"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
            opacity: isVisible ? 1 : 0
          }}
          aria-hidden="true"
        />
      )}

      {/* Transparent Hover Ring / Section Badge Follower */}
      <div
        className={`custom-cursor-trailer ${sectionLabel ? 'section-badge-active' : isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate3d(${trailerPos.x}px, ${trailerPos.y}px, 0) translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0
        }}
        aria-hidden="true"
      >
        {sectionLabel && (
          <div className="section-cursor-content">
            <ArrowUpRight size={14} className="section-cursor-arrow" />
            <span className="section-cursor-text">{sectionLabel}</span>
          </div>
        )}
      </div>
    </>
  );
}
