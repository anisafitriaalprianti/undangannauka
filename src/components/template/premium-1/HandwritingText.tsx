'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

/* ──────────────────────────────────────────────────────────────
   T1: HandwritingText — Letter-by-letter reveal
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Each character fades in with opacity + micro Y drift,
   like ink settling onto paper. Natural, organic feel.

   Props:
   - text: string to animate
   - className: styling for the text container
   - style: inline styles
   - charDelay: delay between each character (seconds)
   - startDelay: initial delay before animation starts (seconds)
   - as: HTML element tag (default 'p')
   ────────────────────────────────────────────────────────────── */

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

interface HandwritingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;
  startDelay?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  onComplete?: () => void;
}

export default function HandwritingText({
  text,
  className = '',
  style = {},
  charDelay = 0.04,
  startDelay = 0,
  as: Tag = 'p',
  onComplete,
}: HandwritingTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Split text into characters, preserving spaces
  const chars = useMemo(() => text.split(''), [text]);

  // Calculate total duration for onComplete callback
  const totalDuration = startDelay + chars.length * charDelay + 1.2;

  // Trigger onComplete when animation finishes
  if (isInView && onComplete) {
    setTimeout(onComplete, totalDuration * 1000);
  }

  return (
    <div ref={ref} className={className} style={{ ...style, display: 'inline' }}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : undefined,
            willChange: 'opacity, transform',
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{
            delay: startDelay + i * charDelay,
            duration: 0.6,
            ease: EASE_CINEMATIC,
          }}
          aria-hidden={i < chars.length - 1 ? true : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}
