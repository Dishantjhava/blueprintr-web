import React, { useRef, useState, useMemo } from 'react';
import './Shuffle.css';

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const Shuffle = ({
  text = 'BLUEPRINTR',
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  tag = 'span',
  textAlign = 'left',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  stagger = 0.03,
  scrambleCharset = DEFAULT_CHARSET,
  colorFrom,
  colorTo,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const containerRef = useRef(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const characters = useMemo(() => text.split(''), [text]);

  const scrambleChars = useMemo(() => {
    return characters.map((char) => {
      if (char === ' ') return ' ';
      const rolls = [];
      const times = Math.max(1, Math.floor(shuffleTimes));
      for (let i = 0; i < times; i++) {
        rolls.push(scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length)) || char);
      }
      return rolls;
    });
  }, [characters, shuffleTimes, scrambleCharset]);

  const handleMouseEnter = () => {
    if (!triggerOnHover || isShuffling) return;

    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onShuffleComplete) onShuffleComplete();
      return;
    }

    setIsShuffling(true);
    const totalDurationMs = (duration + stagger * characters.length) * 1000;
    setTimeout(() => {
      setIsShuffling(false);
      if (onShuffleComplete) onShuffleComplete();
    }, totalDurationMs);
  };

  const Tag = tag || 'span';

  return (
    <Tag
      ref={containerRef}
      className={`shuffle-parent ${className}`}
      style={{ textAlign, display: 'inline-flex', alignItems: 'center', gap: '0.01em', ...style }}
      onMouseEnter={handleMouseEnter}
    >
      {characters.map((char, charIdx) => {
        if (char === ' ') {
          return <span key={charIdx} style={{ width: '0.3em' }}> </span>;
        }

        const isOdd = charIdx % 2 === 1;
        const delaySec = animationMode === 'evenodd' 
          ? (isOdd ? 0 : 0.06) + charIdx * stagger 
          : Math.random() * maxDelay;

        return (
          <span
            key={charIdx}
            className="shuffle-char-strip"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              height: '1.15em'
            }}
          >
            <span
              className="shuffle-char-inner"
              style={{
                display: 'inline-flex',
                flexDirection: shuffleDirection === 'down' || shuffleDirection === 'up' ? 'column' : 'row',
                transform: isShuffling
                  ? shuffleDirection === 'right'
                    ? `translate3d(-${(shuffleTimes) * 100}%, 0, 0)`
                    : shuffleDirection === 'left'
                    ? `translate3d(${(shuffleTimes) * 100}%, 0, 0)`
                    : shuffleDirection === 'down'
                    ? `translate3d(0, -${(shuffleTimes) * 100}%, 0)`
                    : `translate3d(0, ${(shuffleTimes) * 100}%, 0)`
                  : 'translate3d(0, 0, 0)',
                transitionProperty: 'transform, color',
                transitionDuration: isShuffling ? `${duration}s` : '0s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: isShuffling ? `${delaySec}s` : '0s',
                color: isShuffling && colorFrom ? colorFrom : colorTo || 'inherit'
              }}
            >
              <span className="shuffle-char" data-orig="1" style={{ display: 'inline-block', minWidth: '0.55em' }}>{char}</span>
              {isShuffling && scrambleChars[charIdx].map((scrambleChar, rollIdx) => (
                <span key={rollIdx} className="shuffle-char" style={{ display: 'inline-block', minWidth: '0.55em' }}>{scrambleChar}</span>
              ))}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};

export default Shuffle;
