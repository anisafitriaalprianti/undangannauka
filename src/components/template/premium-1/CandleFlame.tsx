'use client';

import { useRef, useEffect } from 'react';

/* ──────────────────────────────────────────────────────────────
   T3: CINEMATIC CANDLE LIGHTING

   Technique: Light affects surfaces — not just blur glow overlay

   Core principles:
   1. CINEMATIC LIGHT FALLOFF — inverse-square-ish decay from
      light source position. Close = warm gold, mid = dim amber,
      far = near darkness. Not a uniform overlay.
   2. LAYERED AMBIENT LIGHTING — multiple independent light
      layers at different heights/intensities. Real candlelight
      doesn't produce one flat glow — it creates zones.
   3. SURFACE LIGHT RESPONSE — the text, dividers, and elements
      catch warm highlights on their top edges.
      Elements further away are cooler/dimmer. The light wraps
      around surfaces, not just sits on top.
   4. SUBTLE VOLUMETRIC WARMTH — visible light scatter in the
      air between source and surfaces. Like dust motes catching
      light. Thin, directional, not a foggy haze.

   What this is NOT:
   - ❌ Blur glow overlay (just slapping radial-gradient on top)
   - ❌ Flat opacity breathing (same intensity everywhere)
   - ❌ Generic vignette (uniform edge darkening)
   - ❌ Visible candle/flame (that distracts from the text)

   NO VISIBLE CANDLE. The light source is IMPLIED — you feel
   the warmth but you don't see the object. This keeps guests
   focused on the TEXT being illuminated, not the light source.

   Implementation layers (bottom to top):
   A. Shadow zones — where light DOESN'T reach (deep corners)
   B. Volumetric warmth — visible light in the air itself
   C. Surface response layers — light hitting specific surfaces
   D. Ambient light zones — primary, secondary falloff
   ────────────────────────────────────────────────────────────── */

interface CinematicCandleLightingProps {
  /** Whether the lighting should be active. Default true */
  visible?: boolean;
}

export default function CinematicCandleLighting({
  visible = true,
}: CinematicCandleLightingProps) {
  const primaryLightRef = useRef<HTMLDivElement>(null);
  const secondaryLightRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const volumetricRef = useRef<HTMLDivElement>(null);
  const surfaceResponseRef = useRef<HTMLDivElement>(null);
  const tertiaryLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    const primaryLight = primaryLightRef.current;
    const secondaryLight = secondaryLightRef.current;
    const shadow = shadowRef.current;
    const volumetric = volumetricRef.current;
    const surfaceResponse = surfaceResponseRef.current;
    const tertiaryLight = tertiaryLightRef.current;

    // ═══ LAYER D1: PRIMARY AMBIENT — fast, tight, centered ═══
    // The brightest zone — right on the content. Follows the
    // flicker closely with slight lag, like light travel time.
    const primaryBreath = primaryLight?.animate(
      [
        { opacity: 0.7, transform: 'scale(1)' },
        { opacity: 1, transform: 'scale(1.02)' },
        { opacity: 0.6, transform: 'scale(0.98)' },
        { opacity: 0.9, transform: 'scale(1.01)' },
        { opacity: 0.7, transform: 'scale(1)' },
      ],
      { duration: 2200, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER D2: SECONDARY AMBIENT — slow, broad warmth ═══
    // The "room glow" — diffused, delayed, gentler.
    // This is the warmth you feel before you see it.
    const secondaryBreath = secondaryLight?.animate(
      [
        { opacity: 0.5, transform: 'scale(1)' },
        { opacity: 0.7, transform: 'scale(1.02)' },
        { opacity: 0.4, transform: 'scale(0.99)' },
        { opacity: 0.6, transform: 'scale(1.01)' },
        { opacity: 0.5, transform: 'scale(1)' },
      ],
      { duration: 5500, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER D3: TERTIARY — subtle wash across whole scene ═══
    // The faintest, broadest warmth. Barely perceptible but
    // without it the edges feel dead/uniform.
    const tertiaryBreath = tertiaryLight?.animate(
      [
        { opacity: 0.6 },
        { opacity: 0.8 },
        { opacity: 0.5 },
        { opacity: 0.7 },
        { opacity: 0.6 },
      ],
      { duration: 8000, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER A: SHADOW ZONES — inverse of light ═══
    // Corners and edges that the candle CAN'T reach.
    // These deepen when light is dimmer, lighten when brighter.
    const shadowPulse = shadow?.animate(
      [
        { opacity: 0.4 },
        { opacity: 0.32 },
        { opacity: 0.45 },
        { opacity: 0.36 },
        { opacity: 0.4 },
      ],
      { duration: 6000, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER B: VOLUMETRIC WARMTH — light in the air ═══
    // Subtle directional scatter from source downward.
    // Like seeing dust motes catch light in a beam.
    const volumetricPulse = volumetric?.animate(
      [
        { opacity: 0.06, transform: 'translateY(0)' },
        { opacity: 0.1, transform: 'translateY(2px)' },
        { opacity: 0.05, transform: 'translateY(-1px)' },
        { opacity: 0.08, transform: 'translateY(1px)' },
        { opacity: 0.06, transform: 'translateY(0)' },
      ],
      { duration: 4000, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER C: SURFACE RESPONSE — light on surfaces ═══
    // The warm highlight that appears on the top edges of text
    // and elements. This is the key differentiator:
    // light is not just "on top of" things — it hits surfaces.
    const surfacePulse = surfaceResponse?.animate(
      [
        { opacity: 0.4 },
        { opacity: 0.55 },
        { opacity: 0.35 },
        { opacity: 0.5 },
        { opacity: 0.4 },
      ],
      { duration: 2800, easing: 'ease-in-out', iterations: Infinity }
    );

    return () => {
      primaryBreath?.cancel();
      secondaryBreath?.cancel();
      tertiaryBreath?.cancel();
      shadowPulse?.cancel();
      volumetricPulse?.cancel();
      surfacePulse?.cancel();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          LAYER A: SHADOW ZONES — where light doesn't reach
          ════════════════════════════════════════════════════════
          Cinematic light falloff: inverse-square from center.
          Center = bright. Edges/corners = darkness.
          Asymmetric — darker at bottom corners because
          candlelight goes UP more than down. */}
      <div
        ref={shadowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 50% 45% at 50% 40%,
              transparent 0%,
              transparent 20%,
              rgba(20, 16, 12, 0.06) 35%,
              rgba(20, 16, 12, 0.18) 50%,
              rgba(20, 16, 12, 0.35) 70%,
              rgba(20, 16, 12, 0.55) 90%
            )
          `,
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER B: VOLUMETRIC WARMTH — visible light scatter
          ════════════════════════════════════════════════════════
          Light traveling through air catches dust/moisture.
          Directional: from center, spreading downward and outward.
          NOT a foggy haze — thin, purposeful. */}
      <div
        ref={volumetricRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '25%',
          width: '80%',
          height: '60%',
          transform: 'translate(-50%, 0)',
          background: `
            radial-gradient(
              ellipse 35% 70% at 50% 10%,
              rgba(201, 169, 110, 0.04) 0%,
              rgba(198, 167, 105, 0.015) 30%,
              transparent 70%
            )
          `,
          opacity: 0.06,
          zIndex: 2,
        }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER C: SURFACE LIGHT RESPONSE — light hits surfaces
          ════════════════════════════════════════════════════════
          THE KEY DIFFERENTIATOR. Not a glow ON TOP of content —
          it's light that RESPONDS to surfaces below.

          The content area (center) gets a warm highlight on its
          top edges — like a desk lit by candle from above.
          Further from center = cooler, less warm.
          Creates the illusion that text is PHYSICALLY below
          the light source, catching its rays. */}
      <div
        ref={surfaceResponseRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '30%',
          width: '70%',
          height: '35%',
          transform: 'translate(-50%, 0)',
          background: `
            radial-gradient(
              ellipse 60% 50% at 50% 0%,
              rgba(212, 186, 130, 0.08) 0%,
              rgba(201, 169, 110, 0.03) 40%,
              transparent 80%
            )
          `,
          opacity: 0.4,
          zIndex: 2,
        }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER D: LAYERED AMBIENT LIGHTING — multiple zones
          ════════════════════════════════════════════════════════
          Real candlelight creates ZONES of illumination:
          - Primary: tight, bright, centered on content
          - Secondary: broader, dimmer, delayed
          - Tertiary: faintest wash across whole scene
          Each zone has its own flicker rhythm and intensity. */}

      {/* D1: Primary ambient — tight, bright, centered on content */}
      <div
        ref={primaryLightRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '40%',
          width: '120%',
          height: '80%',
          transform: 'translate(-50%, -40%)',
          background: `radial-gradient(
            ellipse 30% 25% at 50% 30%,
            rgba(201, 169, 110, 0.12) 0%,
            rgba(198, 167, 105, 0.06) 40%,
            rgba(198, 167, 105, 0.02) 65%,
            transparent 85%
          )`,
          opacity: 0.7,
          zIndex: 3,
        }}
      />

      {/* D2: Secondary ambient — broad, dim, slow response */}
      <div
        ref={secondaryLightRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '35%',
          width: '200%',
          height: '160%',
          transform: 'translate(-50%, -25%)',
          background: `radial-gradient(
            ellipse 35% 30% at 50% 25%,
            rgba(201, 169, 110, 0.05) 0%,
            rgba(198, 167, 105, 0.02) 40%,
            transparent 70%
          )`,
          opacity: 0.5,
          zIndex: 3,
        }}
      />

      {/* D3: Tertiary ambient — faintest wash, whole scene */}
      <div
        ref={tertiaryLightRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '40%',
          width: '300%',
          height: '250%',
          transform: 'translate(-50%, -30%)',
          background: `radial-gradient(
            ellipse 40% 35% at 50% 30%,
            rgba(201, 169, 110, 0.02) 0%,
            rgba(198, 167, 105, 0.008) 45%,
            transparent 70%
          )`,
          opacity: 0.6,
          zIndex: 3,
        }}
      />
    </>
  );
}
