'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   T2: PencilBuildUpImage — Sketch → Shading → Photo reveal
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   3-layer reveal that simulates pencil drawing build-up:
   Layer 1 (0-1.5s): High contrast grayscale + thin edges — sketch outline
   Layer 2 (1.5-3s): Sepia tone + reduced contrast — shading depth
   Layer 3 (3-5s): Full color fade in — final cinematic photograph

   Props:
   - src: image path
   - alt: alt text
   - aspectRatio: e.g. '574 / 388'
   - sizes: responsive sizes string
   - maxWidth: max width of container
   - className: additional classes for outer wrapper
   ────────────────────────────────────────────────────────────── */

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

interface PencilBuildUpImageProps {
  src: string;
  alt: string;
  aspectRatio: string;
  sizes?: string;
  maxWidth?: string;
  className?: string;
}

export default function PencilBuildUpImage({
  src,
  alt,
  aspectRatio,
  sizes = '85vw',
  maxWidth = '520px',
  className = '',
}: PencilBuildUpImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ maxWidth }}
    >
      <div
        className="nauka-edge-soft relative overflow-hidden rounded-lg md:rounded-xl"
        style={{
          aspectRatio,
          boxShadow:
            '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
        }}
      >
        {/* ── BASE IMAGE — always present, opacity controls visibility ── */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 2.0,
            delay: 3.0, // Full color appears after sketch + shading phases
            ease: EASE_CINEMATIC,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover"
            priority={false}
          />
        </motion.div>

        {/* ── LAYER 1: SKETCH — High contrast grayscale, appears first ──
            Like a pencil outline sketch — bright edges, no color */}
        <motion.div
          className="absolute inset-0"
          style={{ filter: 'grayscale(100%) contrast(1.8) brightness(1.3)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{
            duration: 1.5,
            delay: 0,
            ease: 'easeOut',
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
            priority={false}
            aria-hidden="true"
          />
          {/* Edge detection overlay — makes it look more like sketch lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(245, 240, 232, 0.4)',
              mixBlendMode: 'lighten',
            }}
          />
        </motion.div>

        {/* ── LAYER 1 FADE OUT — Sketch fades as shading arrives ── */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--p1-ivory)' }}
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            duration: 2.0,
            delay: 1.5,
            ease: EASE_CINEMATIC,
          }}
        />

        {/* ── LAYER 2: SHADING — Sepia tone, reduced contrast ──
            Like pencil shading being added — warmth and depth appear */}
        <motion.div
          className="absolute inset-0"
          style={{ filter: 'sepia(50%) contrast(1.2) brightness(1.05)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 2.0,
            delay: 1.5,
            ease: EASE_CINEMATIC,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
            priority={false}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── LAYER 2 → LAYER 3 TRANSITION — Sepia fades to full color ── */}
        <motion.div
          className="absolute inset-0"
          style={{ filter: 'sepia(50%) contrast(1.2) brightness(1.05)' }}
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            duration: 2.5,
            delay: 3.0,
            ease: EASE_CINEMATIC,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
            priority={false}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── SKETCH FRAME — thin gold border appears during sketch phase, fades ── */}
        <motion.div
          className="absolute inset-[-3px] rounded-lg md:rounded-xl pointer-events-none"
          style={{ border: '1px solid var(--p1-gold)' }}
          initial={{ opacity: 0 }}
          animate={isInView
            ? { opacity: [0, 0.6, 0.6, 0] }
            : { opacity: 0 }
          }
          transition={{
            duration: 4.0,
            delay: 0.2,
            ease: EASE_CINEMATIC,
            opacity: {
              duration: 4.0,
              times: [0, 0.15, 0.5, 1],
              ease: 'easeOut',
            },
          }}
        />
      </div>
    </motion.div>
  );
}
