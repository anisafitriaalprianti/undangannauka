'use client';

import { useRef, useEffect } from 'react';

/* ──────────────────────────────────────────────────────────────
   CandleFlame — Realistic CSS-only candle flame with ambient light

   Technique: Multi-layer CSS approach
   1. FLAME CORE: Inner white-hot teardrop (the brightest part)
   2. FLAME BODY: Yellow-orange gradient body that flickers
   3. FLAME HALO: Soft warm glow surrounding the flame
   4. AMBIENT LIGHT: Radial gradient casting warm light onto the scene
   5. SHADOW PLAY: Vignette edges that deepen/fade with the flicker

   Inspired by Irwan-Anira's candleFlicker pattern but enhanced with:
   - Actual visible flame (not just gradient blobs)
   - Organic flicker via Web Animation API (not CSS keyframes)
   - Ambient light that responds to flame intensity
   - Candle wax base with subtle glow
   ────────────────────────────────────────────────────────────── */

interface CandleFlameProps {
  /** Position from left, as percentage string. Default "50%" */
  left?: string;
  /** Position from top, as percentage string. Default "12%" */
  top?: string;
  /** Scale factor for the entire flame. Default 1 */
  scale?: number;
  /** Whether the flame should be visible. Default true */
  visible?: boolean;
}

export default function CandleFlame({
  left = '50%',
  top = '12%',
  scale = 1,
  visible = true,
}: CandleFlameProps) {
  const flameRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !flameRef.current) return;

    // ─── ORGANIC FLICKER via Web Animation API ───
    // Multi-frequency flicker: fast micro-flickers + slow breathing
    // This creates a much more realistic flame than simple CSS keyframes

    const flame = flameRef.current;
    const ambient = ambientRef.current;
    const shadow = shadowRef.current;

    // Fast micro-flicker (0.3-0.8s per cycle) — the flame dancing
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
      {
        duration: 1800,
        easing: 'ease-in-out',
        iterations: Infinity,
      }
    );

    // Slow breathing (4-7s per cycle) — the warm glow expanding/contracting
    const ambientBreath = ambient?.animate(
      [
        { opacity: 0.12, transform: 'scale(1)' },
        { opacity: 0.18, transform: 'scale(1.03)' },
        { opacity: 0.1, transform: 'scale(0.98)' },
        { opacity: 0.16, transform: 'scale(1.02)' },
        { opacity: 0.12, transform: 'scale(1)' },
      ],
      {
        duration: 5500,
        easing: 'ease-in-out',
        iterations: Infinity,
      }
    );

    // Shadow play — vignette that deepens when flame is dimmer
    const shadowPulse = shadow?.animate(
      [
        { opacity: 0.35 },
        { opacity: 0.28 },
        { opacity: 0.4 },
        { opacity: 0.32 },
        { opacity: 0.35 },
      ],
      {
        duration: 6000,
        easing: 'ease-in-out',
        iterations: Infinity,
      }
    );

    return () => {
      microFlicker.cancel();
      ambientBreath?.cancel();
      shadowPulse?.cancel();
    };
  }, [visible, scale]);

  if (!visible) return null;

  return (
    <>
      {/* ═══ AMBIENT LIGHT — warm radial glow cast by the flame ═══
          This is what makes the scene feel candlelit.
          Centered at the flame's position, radiating warm gold light. */}
      <div
        ref={ambientRef}
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          width: '250%',
          height: '300%',
          transform: 'translate(-50%, -30%)',
          background: `radial-gradient(
            ellipse 35% 25% at 50% 20%,
            rgba(201, 169, 110, 0.12) 0%,
            rgba(198, 167, 105, 0.06) 30%,
            rgba(198, 167, 105, 0.02) 55%,
            transparent 75%
          )`,
          opacity: 0.12,
          zIndex: 1,
        }}
      />

      {/* ═══ SHADOW PLAY — vignette that makes edges darker ═══
          Like a room lit only by candlelight — the corners fall into shadow.
          This deepens/fades with the flicker to create living shadows. */}
      <div
        ref={shadowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 55% 50% at 50% 45%,
            transparent 25%,
            rgba(20, 16, 12, 0.15) 50%,
            rgba(20, 16, 12, 0.35) 75%,
            rgba(20, 16, 12, 0.55) 100%
          )`,
          opacity: 0.35,
          zIndex: 2,
        }}
      />

      {/* ═══ CANDLE ASSEMBLY ═══
          Positioned at the specified left/top.
          Contains: wax base → wick → flame */}
      <div
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          transform: 'translate(-50%, -100%)',
          zIndex: 3,
        }}
      >
        {/* ── FLAME CONTAINER ──
            Flickers via Web Animation API on flameRef */}
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

        {/* ── WAX BASE ──
            Simple candle holder - a small warm disc */}
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

        {/* ── WAX GLOW ──
            Warm light reflecting off the wax/holder */}
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
