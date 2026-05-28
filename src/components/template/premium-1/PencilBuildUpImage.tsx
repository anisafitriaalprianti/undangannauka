'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   T2: PencilBuildUpImage — Progressive PAINT reveal
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Simulates a painting being created on canvas:

   Phase 1 (0-2s):  Ivory canvas — blank paper, waiting
   Phase 2 (2-7s):  Sketch outlines appear — high contrast grayscale
                     revealed via IRREGULAR polygon clip-path
                     (like a pencil sketching from left to right)
   Phase 3 (6-10s): Shading fills — sepia tone bleeds through
                     with a SECOND brush stroke sweep
   Phase 4 (9-13s): Full color — the final painting revealed
                     with a THIRD broader sweep

   KEY TECHNIQUE: Instead of simple `clip-path: inset()`,
   we use `clip-path: polygon()` with irregular right-edge
   points that create an ORGANIC brush-stroke boundary.
   The polygon sweeps from left to right — like a painter's
   hand moving across the canvas.

   The irregular edge (±3% variance) makes it look like
   actual brush strokes rather than a mechanical wipe.
   ────────────────────────────────────────────────────────────── */

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

// Easing for brush sweep — slow start, steady middle, soft finish
const EASE_BRUSH = [0.25, 0.1, 0.25, 1] as const;

// ── Polygon clip-paths with irregular edges ──────────────────────
// Simulates organic brush stroke boundaries

// Phase 2: Sketch sweep — starts thin on left, expands right
const SKETCH_START = 'polygon(0% 0%, 2% 0%, 0% 12%, 3% 25%, 1% 37%, 2% 50%, 0% 62%, 3% 75%, 1% 87%, 2% 100%, 0% 100%)';
const SKETCH_END =   'polygon(0% 0%, 100% 0%, 98% 12%, 100% 25%, 97% 37%, 99% 50%, 100% 62%, 98% 75%, 100% 87%, 99% 100%, 0% 100%)';

// Phase 3: Shading sweep — slightly different irregularity
const SHADING_START = 'polygon(0% 0%, 1% 0%, 3% 12%, 0% 25%, 2% 37%, 1% 50%, 3% 62%, 0% 75%, 2% 87%, 1% 100%, 0% 100%)';
const SHADING_END =   'polygon(0% 0%, 100% 0%, 99% 12%, 97% 25%, 100% 37%, 98% 50%, 100% 62%, 97% 75%, 99% 87%, 100% 100%, 0% 100%)';

// Phase 4: Color sweep — broader, more confident strokes
const COLOR_START = 'polygon(0% 0%, 3% 0%, 1% 15%, 2% 30%, 0% 45%, 3% 60%, 1% 75%, 2% 90%, 0% 100%, 0% 100%)';
const COLOR_END =   'polygon(0% 0%, 100% 0%, 99% 15%, 100% 30%, 98% 45%, 100% 60%, 99% 75%, 100% 90%, 98% 100%, 0% 100%)';

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
        className="nauka-edge-soft relative overflow-hidden"
        style={{
          aspectRatio,
          /* ═══ EDGE FEATHERING — image blends into background ═══
             No hard border, no card shadow, no rounded corners.
             The mask-image softens all 4 edges so the image
             fades seamlessly into whatever background is behind it.
             Like a painting on a wall — you can't see where
             the paint ends and the wall begins. */
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)
          `,
          maskImage: `
            linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)
          `,
          WebkitMaskComposite: 'intersect',
          maskComposite: 'intersect',
        }}
      >
        {/* ═══════════════════════════════════════════════════════
            PHASE 1: IVORY CANVAS (0-2s)
            Blank canvas with paper texture
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: 'var(--p1-ivory)' }}
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            duration: 3.0,
            delay: 2.0,
            ease: EASE_CINEMATIC,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
              opacity: 0.06,
              mixBlendMode: 'multiply',
            }}
          />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            PHASE 2: SKETCH — Pencil outlines
            High contrast grayscale with IRREGULAR polygon sweep
            Left to right, like a pencil sketching
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[5]"
          style={{
            filter: 'grayscale(100%) contrast(2.0) brightness(1.4)',
            clipPath: SKETCH_START,
          }}
          animate={isInView ? {
            clipPath: SKETCH_END,
            opacity: [0, 0.9],
          } : {}}
          transition={{
            clipPath: {
              duration: 5.0,
              delay: 1.5,
              ease: EASE_BRUSH,
            },
            opacity: {
              duration: 1.0,
              delay: 1.5,
              ease: 'easeOut',
            },
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
          {/* Lighten overlay — thin pencil lines on paper */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(245, 240, 232, 0.5)',
              mixBlendMode: 'lighten',
            }}
          />
        </motion.div>

        {/* Sketch fades as shading arrives */}
        <motion.div
          className="absolute inset-0 z-[6]"
          style={{ backgroundColor: 'var(--p1-ivory)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 3.0,
            delay: 6.0,
            ease: EASE_CINEMATIC,
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            PHASE 3: SHADING — Pencil shading with warmth
            Sepia tone with SECOND brush stroke sweep
            Slightly different timing/edge than sketch
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[4]"
          style={{
            filter: 'sepia(40%) contrast(1.3) brightness(1.1) saturate(0.6)',
            clipPath: SHADING_START,
          }}
          animate={isInView ? {
            clipPath: SHADING_END,
            opacity: [0, 1],
          } : {}}
          transition={{
            clipPath: {
              duration: 4.5,
              delay: 6.0,
              ease: EASE_BRUSH,
            },
            opacity: {
              duration: 1.5,
              delay: 6.0,
              ease: 'easeOut',
            },
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

        {/* Shading fades as full color arrives */}
        <motion.div
          className="absolute inset-0 z-[7]"
          style={{
            filter: 'sepia(40%) contrast(1.3) brightness(1.1) saturate(0.6)',
            opacity: 0,
          }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 3.0,
            delay: 9.0,
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

        {/* ═══════════════════════════════════════════════════════
            PHASE 4: FULL COLOR — The finished painting
            Full color with THIRD broad brush sweep
            More confident strokes — the artist is finishing
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[3]"
          style={{
            clipPath: COLOR_START,
          }}
          animate={isInView ? {
            clipPath: COLOR_END,
            opacity: [0, 1],
          } : {}}
          transition={{
            clipPath: {
              duration: 4.0,
              delay: 9.0,
              ease: EASE_BRUSH,
            },
            opacity: {
              duration: 1.5,
              delay: 9.0,
              ease: 'easeOut',
            },
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

        {/* ═══════════════════════════════════════════════════════
            PENCIL/CANVAS TEXTURE OVERLAY
            Crosshatch texture during sketch/shading
            Fades when color fills in — like the canvas
            being covered by paint
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[8] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='crosshatch'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23crosshatch)'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            mixBlendMode: 'multiply',
          }}
          initial={{ opacity: 0 }}
          animate={isInView
            ? { opacity: [0, 0.12, 0.12, 0.08, 0] }
            : { opacity: 0 }
          }
          transition={{
            duration: 12.0,
            delay: 1.5,
            times: [0, 0.1, 0.3, 0.55, 1],
            ease: 'easeOut',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            REMOVED: Sketch frame gold border
            No visible frame — image blends seamlessly
            into the background without card boundaries.
            ═══════════════════════════════════════════════════════ */}
      </div>
    </motion.div>
  );
}
