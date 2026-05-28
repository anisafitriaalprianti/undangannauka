'use client';

import { useRef, useEffect, useCallback } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════
 *  T6 — Cinematic Ambience
 * ═══════════════════════════════════════════════════════════════
 *
 *  TECHNIQUE: Procedural ambient soundscape generated entirely
 *  with the Web Audio API. No audio files required.
 *
 *  CONCEPT: This is NOT background music — it's the SOUND OF
 *  THE WORLD. When the invitation opens, a subtle auditory
 *  atmosphere emerges: wind, night air, a distant warmth.
 *  The ambience should be barely perceptible — more felt
 *  than heard — like the sound of a room at midnight.
 *
 *  AUDIO LAYERS:
 *  ─────────────────────────────────────────────────────────
 *  1. NIGHT WIND
 *     - Filtered white noise through a bandpass filter
 *     - Bandpass center: ~400Hz (range 200-600Hz)
 *     - Volume: 0.015 (extremely low)
 *     - Gentle LFO on filter frequency for organic movement
 *     - Simulates distant wind outside a window
 *
 *  2. WARM DRONE
 *     - Sine wave at ~110Hz (fundamental)
 *     - Second harmonic at ~220Hz
 *     - Volume: 0.008 (barely audible warmth)
 *     - Gentle volume LFO for breathing effect
 *     - Creates a subtle, warm hum — like a room breathing
 *
 *  3. AIR TEXTURE
 *     - Higher frequency filtered noise (bandpass 2000-4000Hz)
 *     - Volume: 0.005 (almost subliminal)
 *     - Simulates the sound of air in a quiet room
 *     - Adds "space" and depth to the soundscape
 *
 *  LIFECYCLE:
 *  ─────────────────────────────────────────────────────────
 *  - AudioContext is created lazily on first `active=true`
 *    to comply with browser autoplay policies
 *  - On activation: 3-second fade-in across all layers
 *  - On deactivation: 2-second fade-out, then full stop
 *  - All nodes cleaned up on component unmount
 *
 *  AUTOPLAY POLICY COMPLIANCE:
 *  ─────────────────────────────────────────────────────────
 *  Browsers require AudioContext to be created or resumed
 *  within a user gesture handler. Since `active` becomes
 *  true in response to the "Buka Undangan" button click
 *  (a user gesture), we create the AudioContext at that
 *  moment — ensuring compliance.
 *
 * ═══════════════════════════════════════════════════════════════
 */

interface CinematicAmbienceProps {
  /** true when the invitation has been opened ("Buka Undangan" clicked) */
  active: boolean;
}

/** Duration of fade-in when ambience activates (seconds) */
const FADE_IN_DURATION = 3.0;

/** Duration of fade-out when ambience deactivates (seconds) */
const FADE_OUT_DURATION = 2.0;

/** Sample rate for generated audio buffers */
const SAMPLE_RATE = 44100;

/** Buffer duration for noise sources (seconds) — loops seamlessly */
const NOISE_BUFFER_DURATION = 4;

export default function CinematicAmbience({ active }: CinematicAmbienceProps) {
  // ── Refs for AudioContext and all audio nodes ──
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Night Wind layer refs
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const windFilterRef = useRef<BiquadFilterNode | null>(null);
  const windLfoRef = useRef<OscillatorNode | null>(null);
  const windLfoGainRef = useRef<GainNode | null>(null);

  // Warm Drone layer refs
  const droneFundRef = useRef<OscillatorNode | null>(null);
  const droneHarmRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const droneLfoRef = useRef<OscillatorNode | null>(null);
  const droneLfoGainRef = useRef<GainNode | null>(null);

  // Air Texture layer refs
  const airSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const airGainRef = useRef<GainNode | null>(null);
  const airFilterRef = useRef<BiquadFilterNode | null>(null);

  // Track whether we're currently fading out to prevent double-cleanup
  const isFadingOutRef = useRef(false);
  // Track if audio has been fully started
  const isStartedRef = useRef(false);

  /**
   * Creates a noise AudioBuffer filled with random float values.
   * This simulates white noise when used with an AudioBufferSourceNode.
   */
  const createNoiseBuffer = useCallback((ctx: AudioContext): AudioBuffer => {
    const bufferSize = SAMPLE_RATE * NOISE_BUFFER_DURATION;
    const buffer = ctx.createBuffer(1, bufferSize, SAMPLE_RATE);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Random values between -1 and 1 (white noise)
      data[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }, []);

  /**
   * Stops all sources, disconnects all nodes, and closes the AudioContext.
   * Called after fade-out completes, or on component unmount.
   *
   * NOTE: Declared before stopAmbience to satisfy the react-hooks/immutability
   * rule (no accessing variables before they are declared).
   */
  const cleanupAll = useCallback(() => {
    // Stop all source nodes (AudioBufferSourceNode and OscillatorNode)
    // Using try-catch since stopping an already-stopped node throws
    try { windSourceRef.current?.stop(); } catch { /* already stopped */ }
    try { windLfoRef.current?.stop(); } catch { /* already stopped */ }
    try { droneFundRef.current?.stop(); } catch { /* already stopped */ }
    try { droneHarmRef.current?.stop(); } catch { /* already stopped */ }
    try { droneLfoRef.current?.stop(); } catch { /* already stopped */ }
    try { airSourceRef.current?.stop(); } catch { /* already stopped */ }

    // Disconnect all nodes
    windSourceRef.current?.disconnect();
    windFilterRef.current?.disconnect();
    windGainRef.current?.disconnect();
    windLfoRef.current?.disconnect();
    windLfoGainRef.current?.disconnect();

    droneFundRef.current?.disconnect();
    droneHarmRef.current?.disconnect();
    droneGainRef.current?.disconnect();
    droneLfoRef.current?.disconnect();
    droneLfoGainRef.current?.disconnect();

    airSourceRef.current?.disconnect();
    airFilterRef.current?.disconnect();
    airGainRef.current?.disconnect();

    masterGainRef.current?.disconnect();

    // Close the AudioContext to free system resources
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }

    // Reset all refs
    audioContextRef.current = null;
    masterGainRef.current = null;
    windSourceRef.current = null;
    windFilterRef.current = null;
    windGainRef.current = null;
    windLfoRef.current = null;
    windLfoGainRef.current = null;
    droneFundRef.current = null;
    droneHarmRef.current = null;
    droneGainRef.current = null;
    droneLfoRef.current = null;
    droneLfoGainRef.current = null;
    airSourceRef.current = null;
    airFilterRef.current = null;
    airGainRef.current = null;

    isStartedRef.current = false;
    isFadingOutRef.current = false;
  }, []);

  /**
   * Fades out all audio over 2 seconds, then stops and disconnects everything.
   * Delegates to cleanupAll after the fade-out completes.
   */
  const stopAmbience = useCallback(() => {
    const ctx = audioContextRef.current;
    const masterGain = masterGainRef.current;

    if (!ctx || !masterGain || !isStartedRef.current || isFadingOutRef.current) {
      return;
    }

    isFadingOutRef.current = true;

    // Cancel any scheduled ramps and set current value
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);

    // Fade out over 2 seconds
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_OUT_DURATION);

    // Schedule full stop and cleanup after fade-out completes
    setTimeout(() => {
      cleanupAll();
    }, (FADE_OUT_DURATION + 0.5) * 1000); // +0.5s buffer
  }, [cleanupAll]);

  /**
   * Starts all audio layers with a fade-in from silence.
   * AudioContext MUST be created here (within the effect triggered
   * by user interaction) to comply with autoplay policies.
   */
  const startAmbience = useCallback(() => {
    if (isStartedRef.current || isFadingOutRef.current) return;

    // ── Create AudioContext (lazy, on first user gesture) ──
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    // Resume the context in case it's in 'suspended' state
    // (some browsers start it suspended even from user gesture)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // ── Master Gain Node — controls overall volume ──
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    // Fade in over 3 seconds from silence to full
    masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + FADE_IN_DURATION);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // ══════════════════════════════════════════════════════════
    //  LAYER 1: NIGHT WIND
    //  Filtered white noise (bandpass 200-600Hz) at volume 0.015
    //  LFO modulates filter frequency for organic movement
    // ══════════════════════════════════════════════════════════

    // Create white noise buffer source
    const windSource = ctx.createBufferSource();
    windSource.buffer = createNoiseBuffer(ctx);
    windSource.loop = true; // Loop the 4-second noise buffer seamlessly

    // Bandpass filter: center ~400Hz, range ~200-600Hz
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(400, ctx.currentTime);
    windFilter.Q.setValueAtTime(0.7, ctx.currentTime); // Gentle Q for wide passband

    // Gain for night wind volume — EXTREMELY low
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.015, ctx.currentTime);

    // LFO to modulate filter frequency — creates organic wind movement
    // Slow oscillation: ~0.15Hz (one cycle every ~6.7 seconds)
    const windLfo = ctx.createOscillator();
    windLfo.type = 'sine';
    windLfo.frequency.setValueAtTime(0.15, ctx.currentTime);

    // LFO depth: ±150Hz around the center frequency of 400Hz
    // This moves the filter between ~250Hz and ~550Hz
    const windLfoGain = ctx.createGain();
    windLfoGain.gain.setValueAtTime(150, ctx.currentTime);

    // Connect: LFO → LFO Gain → Filter frequency parameter
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);

    // Connect audio path: Source → Filter → Gain → Master → Destination
    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);

    // Start the wind source and LFO
    windSource.start();
    windLfo.start();

    // Store refs
    windSourceRef.current = windSource;
    windFilterRef.current = windFilter;
    windGainRef.current = windGain;
    windLfoRef.current = windLfo;
    windLfoGainRef.current = windLfoGain;

    // ══════════════════════════════════════════════════════════
    //  LAYER 2: WARM DRONE
    //  Sine oscillators at 110Hz + 220Hz, volume 0.008
    //  Volume LFO creates a subtle breathing effect
    // ══════════════════════════════════════════════════════════

    // Fundamental at 110Hz — A2 note, deep and warm
    const droneFund = ctx.createOscillator();
    droneFund.type = 'sine';
    droneFund.frequency.setValueAtTime(110, ctx.currentTime);

    // Second harmonic at 220Hz — A3, adds warmth and body
    const droneHarm = ctx.createOscillator();
    droneHarm.type = 'sine';
    droneHarm.frequency.setValueAtTime(220, ctx.currentTime);

    // Drone gain — EXTREMELY low, barely perceptible warmth
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.008, ctx.currentTime);

    // Volume LFO for breathing effect
    // ~0.08Hz = one breath cycle every ~12.5 seconds
    const droneLfo = ctx.createOscillator();
    droneLfo.type = 'sine';
    droneLfo.frequency.setValueAtTime(0.08, ctx.currentTime);

    // LFO depth: ±0.003 gain (varies between ~0.005 and ~0.011)
    const droneLfoGain = ctx.createGain();
    droneLfoGain.gain.setValueAtTime(0.003, ctx.currentTime);

    // Connect LFO → LFO Gain → Drone Gain parameter
    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(droneGain.gain);

    // Connect audio path: Oscillators → Gain → Master
    droneFund.connect(droneGain);
    droneHarm.connect(droneGain);
    droneGain.connect(masterGain);

    // Start drones and LFO
    droneFund.start();
    droneHarm.start();
    droneLfo.start();

    // Store refs
    droneFundRef.current = droneFund;
    droneHarmRef.current = droneHarm;
    droneGainRef.current = droneGain;
    droneLfoRef.current = droneLfo;
    droneLfoGainRef.current = droneLfoGain;

    // ══════════════════════════════════════════════════════════
    //  LAYER 3: AIR TEXTURE
    //  Higher frequency filtered noise (bandpass 2000-4000Hz)
    //  Volume: 0.005 — adds spatial depth and room presence
    // ══════════════════════════════════════════════════════════

    // Create another white noise buffer source
    const airSource = ctx.createBufferSource();
    airSource.buffer = createNoiseBuffer(ctx);
    airSource.loop = true;

    // Bandpass filter: center ~3000Hz, range ~2000-4000Hz
    const airFilter = ctx.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.setValueAtTime(3000, ctx.currentTime);
    airFilter.Q.setValueAtTime(0.5, ctx.currentTime); // Wide passband

    // Gain for air texture — almost subliminal
    const airGain = ctx.createGain();
    airGain.gain.setValueAtTime(0.005, ctx.currentTime);

    // Connect: Source → Filter → Gain → Master
    airSource.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(masterGain);

    // Start the air source
    airSource.start();

    // Store refs
    airSourceRef.current = airSource;
    airFilterRef.current = airFilter;
    airGainRef.current = airGain;

    // Mark as started
    isStartedRef.current = true;
  }, [createNoiseBuffer]);

  // ── Lifecycle: Start/Stop based on `active` prop ──
  useEffect(() => {
    if (active) {
      // Start ambience when invitation is opened
      startAmbience();
    } else {
      // Fade out when invitation is "closed" (if ever)
      if (isStartedRef.current) {
        stopAmbience();
      }
    }

    // Cleanup on unmount
    return () => {
      if (isStartedRef.current && !isFadingOutRef.current) {
        // Force immediate cleanup on unmount
        const ctx = audioContextRef.current;
        const masterGain = masterGainRef.current;
        if (ctx && masterGain) {
          masterGain.gain.cancelScheduledValues(ctx.currentTime);
          masterGain.gain.setValueAtTime(0, ctx.currentTime);
        }
        cleanupAll();
      }
    };
  }, [active, startAmbience, stopAmbience, cleanupAll]);

  // This component renders nothing — it's purely audio
  return null;
}
