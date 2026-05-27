'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import HandwritingText from './HandwritingText';

interface OpeningProps {
  onComplete: () => void;
}

/**
 * Premium-1 Opening Component — SIMPLIFIED
 * Dark warm background, "Undangan by Nauka" appears with T1 Handwriting.
 * Short, elegant, no candle light.
 *
 * Animation Sequence:
 * 0.0s — Dark warm background appears
 * 0.5s — "Undangan by Nauka" starts handwriting letter-by-letter
 * ~3.0s — Fadeout begins
 * 3.5s — onComplete callback fires
 */
export default function Opening({ onComplete }: OpeningProps) {
  const [showText, setShowText] = useState(false);
  const [fadeout, setFadeout] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleComplete = useCallback(() => {
    if (!hasCompleted) {
      setHasCompleted(true);
      onComplete();
    }
  }, [hasCompleted, onComplete]);

  useEffect(() => {
    // 0.3s: Show text
    const textTimer = setTimeout(() => setShowText(true), 300);

    // 2.8s: Begin fadeout
    const fadeoutTimer = setTimeout(() => setFadeout(true), 2800);

    // 3.5s: Notify parent
    const completeTimer = setTimeout(() => handleComplete(), 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeoutTimer);
      clearTimeout(completeTimer);
    };
  }, [handleComplete]);

  return (
    <motion.div
      className="template-p1 template-p1-dark relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#2A2420' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeout ? 0 : 1 }}
      transition={{ duration: fadeout ? 0.8 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ─── Subtle warm vignette ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 45%, transparent 40%, rgba(20, 16, 12, 0.3) 100%)',
        }}
      />

      {/* ─── Subtle film grain ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.035 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <HandwritingText
                text="Undangan by Nauka"
                className="font-serif italic tracking-[0.12em] select-none"
                style={{
                  color: 'rgba(212, 186, 130, 0.7)',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                }}
                charDelay={0.06}
                startDelay={0.2}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom warm gradient ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(42, 36, 32, 0.3) 100%)',
        }}
      />
    </motion.div>
  );
}
