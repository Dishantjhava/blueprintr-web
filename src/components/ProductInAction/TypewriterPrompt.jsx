import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function TypewriterPrompt({ fullText, isStarted, onTypingComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      setIsDone(true);
      if (onTypingComplete) onTypingComplete();
      return;
    }

    if (!isStarted) {
      setDisplayedText('');
      setIsDone(false);
      return;
    }

    if (isDone) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        if (onTypingComplete) onTypingComplete();
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isStarted, fullText, isDone, onTypingComplete]);

  return (
    <div className="prompt-card">
      <div className="prompt-bar">
        <span className="prompt-symbol" aria-hidden="true">$</span>
        <div className="prompt-input-text">
          <span style={{ color: 'var(--text-muted)' }}>blueprintr generate --prompt "</span>
          <span style={{ color: 'var(--text-primary)' }}>{displayedText}</span>
          <span style={{ color: 'var(--text-muted)' }}>"</span>
          {!isDone && <span className="typing-cursor" aria-hidden="true"></span>}
        </div>
      </div>

      <div className="generation-status" aria-live="polite">
        {isStarted && !isDone && (
          <>
            <div className="status-spinner" aria-hidden="true"></div>
            <span>Synthesizing feature spec, REST contract, & Mongoose schema...</span>
          </>
        )}
        {isDone && (
          <>
            <CheckCircle2 size={16} style={{ color: 'var(--accent-lime)' }} />
            <span style={{ color: 'var(--accent-lime)' }}>Multi-artifact generation pipeline completed</span>
          </>
        )}
      </div>
    </div>
  );
}
