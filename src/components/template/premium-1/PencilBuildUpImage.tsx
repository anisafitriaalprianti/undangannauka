'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   T2: PencilBuildUpImage — Progressive paint reveal
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Simulates a painting being created stroke by stroke:
   Phase 1 (0-2s):  Ivory canvas — empty frame, waiting
   Phase 2 (2-6s):  Sketch lines appear — high contrast grayscale
                     revealed progressively via clip-path (top → bottom)
   Phase 3 (6-9s):  Shading fills in — sepia tone bleeds through
   Phase 4 (9-12s): Color materializes — full photo revealed
                     with slow progressive clip-path expansion

   The key difference from before: clip-path animation creates a
   VISIBLE "brush stroke" effect — the image doesn't just appear,
   it's PAINTED onto the canvas.
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
        {/* ═══════════════════════════════════════════════════════
            PHASE 1: IVORY CANVAS (0-2s)
            Empty canvas — the surface waiting for paint
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: 'var(--p1-ivory)' }}
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            duration: 2.5,
            delay: 1.5,
            ease: EASE_CINEMATIC,
          }}
        >
          {/* Paper texture on the blank canvas */}
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
            PHASE 2: SKETCH LINES (2-6s)
            High contrast grayscale — pencil outlines
            Revealed progressively via clip-path (top → bottom)
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[5]"
          style={{
            filter: 'grayscale(100%) contrast(2.0) brightness(1.4)',
          }}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView
            ? { opacity: 0.85, clipPath: 'inset(0 0 0% 0)' }
            : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{
            opacity: { duration: 1.5, delay: 1.0, ease: 'easeOut' },
            clipPath: { duration: 4.0, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] },
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
          {/* Lighten overlay — makes it look like thin pencil lines on paper */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(245, 240, 232, 0.5)',
              mixBlendMode: 'lighten',
            }}
          />
        </motion.div>

        {/* Sketch lines fade out as shading arrives */}
        <motion.div
          className="absolute inset-0 z-[6]"
          style={{ backgroundColor: 'var(--p1-ivory)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 3.0,
            delay: 5.0,
            ease: EASE_CINEMATIC,
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            PHASE 3: SHADING (5-8s)
            Sepia tone — pencil shading being added
            Also revealed progressively via clip-path
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[4]"
          style={{
            filter: 'sepia(40%) contrast(1.3) brightness(1.1) saturate(0.6)',
          }}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView
            ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
            : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{
            opacity: { duration: 2.0, delay: 5.0, ease: EASE_CINEMATIC },
            clipPath: { duration: 4.0, delay: 5.0, ease: [0.25, 0.1, 0.25, 1] },
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

        {/* Shading layer fades as full color appears */}
        <motion.div
          className="absolute inset-0 z-[7]"
          style={{
            filter: 'sepia(40%) contrast(1.3) brightness(1.1) saturate(0.6)',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 3.0,
            delay: 8.0,
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
            PHASE 4: FULL COLOR PHOTO (8-12s)
            The final cinematic photograph materializes
            Revealed with clip-path — like the last brush strokes
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[3]"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView
            ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
            : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{
            opacity: { duration: 2.5, delay: 8.0, ease: EASE_CINEMATIC },
            clipPath: { duration: 4.5, delay: 8.0, ease: [0.25, 0.1, 0.25, 1] },
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
            PENCIL TEXTURE OVERLAY
            Subtle crosshatch texture during sketch/shading phases
            Fades away when full color appears
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
            duration: 10.0,
            delay: 1.5,
            times: [0, 0.15, 0.35, 0.6, 1],
            ease: 'easeOut',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            SKETCH FRAME — thin gold border
            Appears during sketch phase, fades as color fills in
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-[-3px] rounded-lg md:rounded-xl pointer-events-none z-[9]"
          style={{ border: '1px solid var(--p1-gold)' }}
          initial={{ opacity: 0 }}
          animate={isInView
            ? { opacity: [0, 0.6, 0.6, 0.4, 0] }
            : { opacity: 0 }
          }
          transition={{
            duration: 8.0,
            delay: 1.0,
            times: [0, 0.08, 0.3, 0.6, 1],
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  );
}
