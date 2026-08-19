import React, { useEffect, useState } from 'react';

export default function SplitText({
  text = '',
  className = '',
  style = {},
  delay = 40,
  animationFrom = { opacity: 0, transform: 'translate3d(0,14px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  threshold = 0.2,
  rootMargin = '-50px',
  onLetterAnimationComplete
}) {
  const [words, setWords] = useState([]);
  const [animatedIndex, setAnimatedIndex] = useState(-1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimatedIndex(9999);
      return;
    }

    const wordList = text.split(' ');
    setWords(wordList);

    let current = 0;
    const interval = setInterval(() => {
      if (current < wordList.length) {
        setAnimatedIndex(current);
        current++;
      } else {
        clearInterval(interval);
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, onLetterAnimationComplete]);

  return (
    <span className={`split-text-wrapper ${className}`} style={{ display: 'inline-block', ...style }}>
      {words.map((word, idx) => {
        const isRevealed = idx <= animatedIndex;
        return (
          <span
            key={idx}
            className="split-word"
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              opacity: isRevealed ? animationTo.opacity : animationFrom.opacity,
              transform: isRevealed ? animationTo.transform : animationFrom.transform,
              transition: `opacity 0.5s ${easing}, transform 0.5s ${easing}`,
              marginRight: idx < words.length - 1 ? '0.25em' : '0'
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
