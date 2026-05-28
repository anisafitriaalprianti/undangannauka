'use client';

import { useRef, useEffect } from 'react';

/* ──────────────────────────────────────────────────────────────
   T3: CINEMATIC CANDLE LIGHTING

   Technique: Light affects surfaces — not just blur glow overlay

   Core principles:
   1. CINEMATIC LIGHT FALLOFF — inverse-square-ish decay from
      flame position. Close = warm gold, mid = dim amber,
      far = near darkness. Not a uniform overlay.
   2. LAYERED AMBIENT LIGHTING — multiple independent light
      sources at different heights/intensities. A real candle
      doesn't produce one flat glow — it creates zones.
   3. SURFACE LIGHT RESPONSE — the text, dividers, and elements
      BELOW the flame catch warm highlights on their top edges.
      Elements further away are cooler/dimmer. The light wraps
      around surfaces, not just sits on top.
   4. SUBTLE VOLUMETRIC WARMTH — visible light scatter in the
      air between flame and surfaces. Like dust motes catching
      light. Thin, directional, not a foggy haze.

   What this is NOT:
   - ❌ Blur glow overlay (just slapping radial-gradient on top)
   - ❌ Flat opacity breathing (same intensity everywhere)
   - ❌ Generic vignette (uniform edge darkening)

   Implementation layers (bottom to top):
   A. Shadow zones — where light DOESN'T reach (deep corners)
   B. Volumetric warmth — visible light in the air itself
   C. Surface response layers — light hitting specific surfaces
   D. Ambient light zones — primary, secondary, tertiary falloff
   E. Flame assembly — the visible candle flame
   ────────────────────────────────────────────────────────────── */

interface CinematicCandleLightingProps {
  /** Position from left, as percentage string. Default "50%" */
  left?: string;
  /** Position from top, as percentage string. Default "12%" */
  top?: string;
  /** Scale factor for the flame. Default 1 */
  scale?: number;
  /** Whether the flame should be visible. Default true */
  visible?: boolean;
}

export default function CinematicCandleLighting({
  left = '50%',
  top = '12%',
  scale = 1,
  visible = true,
}: CinematicCandleLightingProps) {
  const flameRef = useRef<HTMLDivElement>(null);
  const primaryLightRef = useRef<HTMLDivElement>(null);
  const secondaryLightRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const volumetricRef = useRef<HTMLDivElement>(null);
  const surfaceResponseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !flameRef.current) return;

    const flame = flameRef.current;
    const primaryLight = primaryLightRef.current;
    const secondaryLight = secondaryLightRef.current;
    const shadow = shadowRef.current;
    const volumetric = volumetricRef.current;
    const surfaceResponse = surfaceResponseRef.current;

    // ═══ LAYER E: FLAME — organic micro-flicker ═══
    // The source of all light. Multi-frequency flicker creates
    // the living, breathing quality of real candlelight.
    const microFlicker = flame.animate(
      [
        { transform: `scale(${scale}) scaleX(1) scaleY(1)`, opacity: 0.95 },
        { transform: `scale(${scale}) scaleX(0.92) scaleY(1.04)`, opacity: 0.88 },
        { transform: `scale(${scale}) scaleX(1.04) scaleY(0.96)`, opacity: 1 },
        { transform: `scale(${scale}) scaleX(0.96) scaleY(1.02)`, opacity: 0.92 },
        { transform: `scale(${scale}) scaleX(1.02) scaleY(0.98)`, opacity: 0.97 },
        { transform: `scale(${scale}) scaleX(0.94) scaleY(1.05)`, opacity: 0.9 },
        { transform: `scale(${scale}) scaleX(1) scaleY(1)`, opacity: 0.95 },
      ],
      { duration: 1800, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER D: PRIMARY AMBIENT — fast response to flame ═══
    // Close to flame, bright warm gold. Follows the flicker closely
    // but with slight lag — like light needing travel time.
    const primaryBreath = primaryLight?.animate(
      [
        { opacity: 0.15, transform: 'scale(1)' },
        { opacity: 0.22, transform: 'scale(1.03)' },
        { opacity: 0.12, transform: 'scale(0.97)' },
        { opacity: 0.19, transform: 'scale(1.02)' },
        { opacity: 0.15, transform: 'scale(1)' },
      ],
      { duration: 2200, easing: 'ease-in-out', iterations: Infinity }
    );

    // ═══ LAYER D: SECONDARY AMBIENT — slow, broad warmth ═══
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

    // ═══ LAYER A: SHADOW ZONES — inverse of light ═══
    // Corners and edges that the candle CAN'T reach.
    // These deepen when flame is dimmer, lighten when brighter.
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
    // Subtle directional scatter from flame downward.
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
    // and elements below the flame. This is the key differentiator:
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
      microFlicker.cancel();
      primaryBreath?.cancel();
      secondaryBreath?.cancel();
      shadowPulse?.cancel();
      volumetricPulse?.cancel();
      surfacePulse?.cancel();
    };
  }, [visible, scale]);

  if (!visible) return null;

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          LAYER A: SHADOW ZONES — where light doesn't reach
          ════════════════════════════════════════════════════════
          Cinematic light falloff: inverse-square from flame position.
          Close to flame = bright. Far = darkness.
          The shadow zones are ASYMMETRIC — darker at bottom corners
          because candlelight goes UP more than down. */}
      <div
        ref={shadowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 50% 40% at ${left} ${top},
              transparent 0%,
              transparent 15%,
              rgba(20, 16, 12, 0.08) 30%,
              rgba(20, 16, 12, 0.2) 50%,
              rgba(20, 16, 12, 0.4) 70%,
              rgba(20, 16, 12, 0.6) 90%
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
          This is the "beam" of warmth between flame and surfaces.
          Directional: from flame position, spreading downward
          and outward. NOT a foggy haze — thin, purposeful. */}
      <div
        ref={volumetricRef}
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          width: '80%',
          height: '60%',
          transform: 'translate(-50%, 0)',
          background: `
            radial-gradient(
              ellipse 30% 80% at 50% 10%,
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
          THE KEY DIFFERENTIATOR. This is not a glow ON TOP of
          content — it's light that RESPONSES to surfaces below.

          The content area (center, below flame) gets a warm
          highlight on its top edges — like a desk lit by candle.
          Further from flame = cooler, less warm.
          This creates the illusion that the text is PHYSICALLY
          below the light source, catching its rays. */}
      <div
        ref={surfaceResponseRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '35%',
          width: '70%',
          height: '30%',
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
          - Primary zone: close to flame, bright warm gold
          - Secondary zone: broader, dimmer, delayed response
          Each zone has its own flicker rhythm and intensity. */}

      {/* D1: Primary ambient — close, bright, fast response */}
      <div
        ref={primaryLightRef}
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          width: '180%',
          height: '200%',
          transform: 'translate(-50%, -25%)',
          background: `radial-gradient(
            ellipse 25% 20% at 50% 15%,
            rgba(201, 169, 110, 0.15) 0%,
            rgba(198, 167, 105, 0.08) 35%,
            rgba(198, 167, 105, 0.02) 60%,
            transparent 80%
          )`,
          opacity: 0.15,
          zIndex: 3,
        }}
      />

      {/* D2: Secondary ambient — broad, dim, slow response */}
      <div
        ref={secondaryLightRef}
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          width: '300%',
          height: '350%',
          transform: 'translate(-50%, -20%)',
          background: `radial-gradient(
            ellipse 30% 25% at 50% 15%,
            rgba(201, 169, 110, 0.05) 0%,
            rgba(198, 167, 105, 0.02) 40%,
            transparent 70%
          )`,
          opacity: 0.5,
          zIndex: 3,
        }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER E: FLAME ASSEMBLY — the light source
          ════════════════════════════════════════════════════════
          The visible candle. Every layer above is a CONSEQUENCE
          of this flame — the shadow, volumetric, surface response,
          and ambient layers all emanate from this point. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          transform: 'translate(-50%, -100%)',
          zIndex: 4,
        }}
      >
        {/* ── FLAME CONTAINER ── */}
        <div ref={flameRef} style={{ transform: `scale(${scale})` }}>
          {/* Outer glow — large, very soft, warm orange */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '8px',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '70px',
              background: `radial-gradient(
                ellipse 50% 45% at 50% 60%,
                rgba(232, 168, 56, 0.25) 0%,
                rgba(232, 168, 56, 0.08) 40%,
                transparent 70%
              )`,
              filter: 'blur(8px)',
            }}
          />

          {/* Flame body — yellow-orange teardrop */}
          <div
            style={{
              position: 'relative',
              width: '14px',
              height: '32px',
              margin: '0 auto',
              background: `radial-gradient(
                ellipse 55% 80% at 50% 90%,
                rgba(255, 200, 60, 0.95) 0%,
                rgba(255, 160, 30, 0.85) 35%,
                rgba(232, 120, 20, 0.6) 60%,
                rgba(200, 80, 15, 0.2) 80%,
                transparent 100%
              )`,
              borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
              filter: 'blur(0.5px)',
            }}
          >
            {/* Inner core — white-hot center */}
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '5px',
                height: '12px',
                background: `radial-gradient(
                  ellipse 60% 70% at 50% 80%,
                  rgba(255, 255, 240, 0.95) 0%,
                  rgba(255, 240, 180, 0.8) 40%,
                  rgba(255, 200, 80, 0.3) 70%,
                  transparent 100%
                )`,
                borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
              }}
            />

            {/* Blue base — the blue flame at the wick */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '5px',
                background: `radial-gradient(
                  ellipse 50% 60% at 50% 70%,
                  rgba(100, 140, 255, 0.4) 0%,
                  rgba(80, 120, 220, 0.2) 50%,
                  transparent 100%
                )`,
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Warm inner glow — tight around flame */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '0px',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '36px',
              background: `radial-gradient(
                ellipse 50% 50% at 50% 65%,
                rgba(255, 200, 80, 0.2) 0%,
                rgba(255, 180, 60, 0.06) 50%,
                transparent 80%
              )`,
              filter: 'blur(3px)',
            }}
          />
        </div>

        {/* ── WICK ── */}
        <div
          style={{
            width: '1px',
            height: '6px',
            margin: '0 auto',
            backgroundColor: 'rgba(60, 40, 20, 0.7)',
          }}
        />

        {/* ── WAX BASE ── */}
        <div
          style={{
            width: '18px',
            height: '4px',
            margin: '0 auto',
            background: `linear-gradient(
              180deg,
              rgba(198, 167, 105, 0.25) 0%,
              rgba(160, 130, 70, 0.15) 100%
            )`,
            borderRadius: '50%',
          }}
        />

        {/* ── WAX GLOW — light reflecting off the holder surface ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30px',
            height: '10px',
            background: `radial-gradient(
              ellipse 60% 50% at 50% 30%,
              rgba(201, 169, 110, 0.1) 0%,
              transparent 80%
            )`,
          }}
        />
      </div>
    </>
  );
}
