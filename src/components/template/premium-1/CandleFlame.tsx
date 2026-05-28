'use client';

import { useRef, useEffect } from 'react';

/* ──────────────────────────────────────────────────────────────
   T3: CINEMATIC CANDLE LIGHTING

   Technique: Light affects surfaces — not just blur glow overlay

   Core principles:
   1. CINEMATIC LIGHT FALLOFF — one seamless gradient from
      warm cream at center to deep brown at edges. No visible
      layer boundaries. Painted as a single stroke, not stacked.
   2. SURFACE LIGHT RESPONSE — the text area catches a subtle
      warm highlight. Light reaches surfaces, it doesn't just
      float on top as a glow.
   3. ORGANIC BREATH — one rhythm for the whole scene, not
      multiple competing flicker cycles. Real candlelight has
      ONE pulse that affects everything together.

   What this is NOT:
   - ❌ Multiple gradient stacks with visible boundaries
   - ❌ Color patches / bands that feel like separate layers
   - ❌ Blur glow overlay (just slapping radial-gradient on top)
   - ❌ Flat opacity breathing (same intensity everywhere)
   - ❌ Generic vignette (uniform edge darkening)
   - ❌ Visible candle/flame (that distracts from the text)

   NO VISIBLE CANDLE. The light source is IMPLIED — you feel
   the warmth but you don't see the object. This keeps guests
   focused on the TEXT being illuminated, not the light source.

   Implementation:
   - MASTER FALLOFF: One carefully crafted radial gradient,
     many color stops, seamless transition from warm cream
     to deep dark brown. This IS the cinematic falloff.
   - SURFACE WARMTH: One gentle warm highlight on the text
     area — light that responds to surfaces below it.
   ────────────────────────────────────────────────────────────── */

interface CinematicCandleLightingProps {
  /** Whether the lighting should be active. Default true */
  visible?: boolean;
}

export default function CinematicCandleLighting({
  visible = true,
}: CinematicCandleLightingProps) {
  const masterRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    const master = masterRef.current;
    const surface = surfaceRef.current;

    // ═══ MASTER FALLOFF BREATH — single organic rhythm ═══
    // One pulse for the whole scene. Like real candlelight —
    // everything brightens and dims together, not separately.
    // Very subtle scale shift: the warm zone breathes slightly,
    // expanding and contracting like a living thing.
    const masterBreath = master?.animate(
      [
        { opacity: 0.88, transform: 'scale(1)' },
        { opacity: 1, transform: 'scale(1.008)' },
        { opacity: 0.82, transform: 'scale(0.996)' },
        { opacity: 0.95, transform: 'scale(1.004)' },
        { opacity: 0.88, transform: 'scale(1)' },
      ],
      { duration: 4500, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ SURFACE WARMTH BREATH — subtle light on surfaces ═══
    // The warm highlight that appears on the text area.
    // Slightly offset rhythm from master — the light hits
    // surfaces a fraction after the source pulses.
    const surfaceBreath = surface?.animate(
      [
        { opacity: 0.7 },
        { opacity: 0.9 },
        { opacity: 0.6 },
        { opacity: 0.85 },
        { opacity: 0.7 },
      ],
      { duration: 3800, easing: 'ease-in-out', iterations: Infinity }
    );

    return () => {
      masterBreath?.cancel();
      surfaceBreath?.cancel();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          MASTER FALLOFF — one painted gradient, seamless
          ════════════════════════════════════════════════════════
          This IS the cinematic falloff. Not a stack of layers —
          one continuous stroke from warm cream to deep brown.

          Many color stops ensure smooth transitions with no
          visible boundaries. Think oil paint blended wet-on-wet:
          the warm center gradually cools and darkens toward edges.

          Center (50% 38%) = warm cream, the brightest point
          Edges = deep dark brown, near black
          Elliptical — wider than tall (light spreads sideways)

          The origin point at 38% from top (not 50%) because
          candlelight feels like it comes from slightly above,
          illuminating what's below it. */}
      <div
        ref={masterRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 60% 55% at 50% 38%,
            rgba(212, 186, 130, 0.13) 0%,
            rgba(207, 178, 120, 0.10) 10%,
            rgba(198, 167, 105, 0.07) 20%,
            rgba(175, 145, 85, 0.05) 30%,
            rgba(130, 105, 65, 0.04) 40%,
            rgba(70, 55, 38, 0.10) 50%,
            rgba(42, 36, 32, 0.30) 60%,
            rgba(32, 26, 22, 0.48) 70%,
            rgba(24, 20, 16, 0.65) 80%,
            rgba(18, 15, 12, 0.80) 90%,
            rgba(14, 12, 10, 0.90) 100%
          )`,
          opacity: 0.88,
          zIndex: 1,
        }}
      />

      {/* ════════════════════════════════════════════════════════
          SURFACE WARMTH — light that reaches surfaces
          ════════════════════════════════════════════════════════
          THE KEY DIFFERENTIATOR: "cahaya mempengaruhi permukaan"

          Not a glow floating ON TOP of content — it's light
          that HITS the text area below. Like a desk lit by
          candle from above: the warm highlight appears on the
          surface, not in the air.

          Very subtle. Barely there. You feel it more than see it.
          Positioned at the text area (center, slightly above mid)
          so the light seems to be reaching down to the words. */}
      <div
        ref={surfaceRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '32%',
          width: '55%',
          height: '38%',
          transform: 'translate(-50%, 0)',
          background: `radial-gradient(
            ellipse 65% 55% at 50% 25%,
            rgba(212, 186, 130, 0.055) 0%,
            rgba(207, 178, 120, 0.03) 30%,
            transparent 65%
          )`,
          opacity: 0.7,
          zIndex: 2,
        }}
      />
    </>
  );
}
