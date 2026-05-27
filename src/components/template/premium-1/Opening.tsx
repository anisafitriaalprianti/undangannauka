'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface OpeningProps {
  onComplete: () => void;
}

/**
 * Premium-1 Opening Component
 * Concept: "Kenangan yang perlahan hidup" — memories slowly coming alive.
 *
 * Animation Sequence:
 * 0.0s — Dark warm background appears
 * 0.5s — Candle ambience glow starts breathing
 * 1.2s — Bismillah in Arabic appears (blur-to-sharp)
 * 2.2s — "Undangan by Nauka" text appears with handwriting feel
 * 3.5s — Subtle fade begins
 * 4.0s — onComplete callback fires
 */
export default function Opening({ onComplete }: OpeningProps) {
  const [showCandle, setShowCandle] = useState(false);
  const [showBismillah, setShowBismillah] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [fadeout, setFadeout] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleComplete = useCallback(() => {
    if (!hasCompleted) {
      setHasCompleted(true);
      onComplete();
    }
  }, [hasCompleted, onComplete]);

  useEffect(() => {
    // 0.5s: Candle ambience starts breathing
    const candleTimer = setTimeout(() => setShowCandle(true), 500);

    // 1.2s: Bismillah appears
    const bismillahTimer = setTimeout(() => setShowBismillah(true), 1200);

    // 2.2s: Brand text appears
    const brandTimer = setTimeout(() => setShowBrand(true), 2200);

    // 3.5s: Begin fadeout
    const fadeoutTimer = setTimeout(() => setFadeout(true), 3500);

    // 4.0s: Notify parent
    const completeTimer = setTimeout(() => handleComplete(), 4000);

    return () => {
      clearTimeout(candleTimer);
      clearTimeout(bismillahTimer);
      clearTimeout(brandTimer);
      clearTimeout(fadeoutTimer);
      clearTimeout(completeTimer);
    };
  }, [handleComplete]);

  return (
    <motion.div
      className="template-p1 relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#2A2420' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeout ? 0 : 1 }}
      transition={{ duration: fadeout ? 0.8 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ─── Candle ambience glow ───
          Warm radial gradient from top-center, like candlelight breathing.
          Uses p1CandleAmbience keyframe from globals.css */}
      <AnimatePresence>
        {showCandle && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Primary candle glow — top center */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 40% at 50% 15%, rgba(198, 167, 105, 0.08) 0%, rgba(198, 167, 105, 0.03) 40%, transparent 70%)',
                animation: 'p1CandleAmbience 6s ease-in-out infinite',
              }}
            />

            {/* Secondary warm wash — broader, softer ambient warmth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 50% 25%, rgba(198, 167, 105, 0.04) 0%, transparent 65%)',
                animation: 'p1CandleAmbience 8s ease-in-out 1s infinite',
              }}
            />

            {/* Warm ambient drift — subtle shifting warm patch */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 40% 30% at 45% 30%, rgba(198, 167, 105, 0.03) 0%, transparent 60%)',
                animation: 'p1WarmDrift 12s ease-in-out infinite',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Paper texture overlay ───
          Very thin, adds organic handcrafted feel.
          Uses nauka-paper class from globals.css */}
      <div className="nauka-paper absolute inset-0 pointer-events-none" />

      {/* ─── Subtle warm vignette ───
          Draws eye toward center, edge darkening for intimacy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 45%, transparent 40%, rgba(20, 16, 12, 0.25) 100%)',
        }}
      />

      {/* ─── Very subtle film grain ───
          Barely visible, adds analog warmth to the dark scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.04 }}
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

      {/* ─── Content ───
          Vertically centered, sequential reveal of sacred and brand text */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Bismillah — Arabic calligraphic text, appears at 1.2s
            Uses p1HandwriteReveal animation: blur-to-sharp with gentle rise */}
        <AnimatePresence>
          {showBismillah && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <p
                className="font-serif text-center leading-relaxed select-none"
                style={{
                  color: 'rgba(212, 186, 130, 0.9)',
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  animation: 'p1HandwriteReveal 2s ease-out forwards',
                  textShadow: '0 0 30px rgba(198, 167, 105, 0.15)',
                }}
                dir="rtl"
                lang="ar"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>

              {/* Thin ornamental divider — appears after Bismillah settles */}
              <motion.div
                className="mt-6"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  width: '60px',
                  height: '1px',
                  background:
                    'linear-gradient(to right, transparent, rgba(198, 167, 105, 0.4), transparent)',
                  transformOrigin: 'center',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand text — "Undangan by Nauka", appears at 2.2s
            Handwriting feel with Playfair Display serif font */}
        <AnimatePresence>
          {showBrand && (
            <motion.div
              className="flex flex-col items-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <p
                className="font-serif italic tracking-wide select-none"
                style={{
                  color: 'rgba(212, 186, 130, 0.65)',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  letterSpacing: '0.12em',
                  animation: 'p1HandwriteReveal 1.8s ease-out forwards',
                  textShadow: '0 0 20px rgba(198, 167, 105, 0.1)',
                }}
              >
                Undangan by Nauka
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom warm gradient ───
          Subtle warmth from below, like a surface reflecting candlelight */}
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
