'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

/* ──────────────────────────────────────────────────────────────
   T1: HandwritingText — Letter-by-letter WRITING reveal
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Each character appears as if being WRITTEN from left to right:
   - Starts invisible, compressed horizontally, slightly to the left
   - Expands outward (like ink flowing from a pen tip)
   - Settles into place with a subtle scale ease

   Key difference from before: NO vertical drift.
   Instead: horizontal "squeeze-out" that feels like a pen
   dragging across paper.

   A thin gold "pen line" underlines the text as it's written,
   reinforcing the left-to-right writing direction.
   ────────────────────────────────────────────────────────────── */

const EASE_WRITING = [0.16, 1, 0.3, 1] as const;

interface HandwritingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;
  startDelay?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  onComplete?: () => void;
  showPenLine?: boolean;
}

export default function HandwritingText({
  text,
  className = '',
  style = {},
  charDelay = 0.07,
  startDelay = 0,
  as: Tag = 'p',
  onComplete,
  showPenLine = true,
}: HandwritingTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  const chars = useMemo(() => text.split(''), [text]);
  const totalDuration = startDelay + chars.length * charDelay + 0.8;

  if (isInView && onComplete) {
    setTimeout(onComplete, totalDuration * 1000);
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, display: 'inline', position: 'relative' }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : undefined,
            willChange: 'opacity, transform',
            transformOrigin: 'left center',
          }}
          initial={{
            opacity: 0,
            scaleX: 0.2,
            x: -3,
            filter: 'blur(2px)',
          }}
          animate={isInView ? {
            opacity: 1,
            scaleX: 1,
            x: 0,
            filter: 'blur(0px)',
          } : {
            opacity: 0,
            scaleX: 0.2,
            x: -3,
            filter: 'blur(2px)',
          }}
          transition={{
            delay: startDelay + i * charDelay,
            duration: 0.6,
            ease: EASE_WRITING,
            filter: {
              duration: 0.3,
              ease: 'easeOut',
            },
          }}
          aria-hidden={i < chars.length - 1 ? true : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {/* ── Pen line — thin gold underline that draws across ──
          Travels left to right as characters are written,
          like the trail of a pen moving across paper */}
      {showPenLine && isInView && (
        <motion.div
          className="absolute left-0 pointer-events-none"
          style={{
            bottom: '-2px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            maxWidth: '100%',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            delay: startDelay,
            duration: chars.length * charDelay + 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      )}
    </div>
  );
}
