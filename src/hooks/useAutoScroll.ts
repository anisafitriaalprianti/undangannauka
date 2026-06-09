'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────────
   T4: useAutoScroll — Irwan-Anira style time accumulator
   Adapted from abuauf4/undangan-nira auto-scroll technique

   Key features from reference repo:
   1. Time accumulator: accumulates fractional pixels, only scrolls
      whole pixels via window.scrollTo() — no sub-pixel jitter
   2. Delta time with 50ms cap: prevents jumps when tab is backgrounded
   3. window.scrollTo() instead of scrollBy(): more reliable
   4. Section-aware speed: faster during info/gallery/RSVP,
      slower during story scenes, pause during closing animation
   5. Cinematic lock: pauses auto-scroll during closing sequence
      via custom events (closing-sequence-start / complete)
   6. Simple toggle: enabled/disabled via prop
   ────────────────────────────────────────────────────────────── */

interface UseAutoScrollOptions {
  enabled: boolean;
  /** Base pixels per millisecond. 0.025 = ~25px/sec */
  pxPerMs?: number;
  /** Delay in ms before auto-scroll starts after enabled */
  startDelay?: number;
}

export default function useAutoScroll({
  enabled,
  pxPerMs = 0.025,
  startDelay = 8000,
}: UseAutoScrollOptions) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const cinematicLockRef = useRef(false);
  const autoScrollActiveRef = useRef(false);

  // Cinematic lock handlers
  const onClosingStart = useCallback(() => {
    cinematicLockRef.current = true;
  }, []);

  const onClosingComplete = useCallback(() => {
    cinematicLockRef.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsAutoScrolling(false);
      autoScrollActiveRef.current = false;
      return;
    }

    let animationId: number;
    let lastTime = 0;
    let accumulated = 0;

    // Section element refs — lazily queried, cached
    let eventInfoEl: Element | null | undefined = undefined;
    let galleryEl: Element | null | undefined = undefined;
    let rsvpEl: Element | null | undefined = undefined;
    let closingEl: Element | null | undefined = undefined;

    const isPastSection = (sectionName: string, elRef: { current: Element | null | undefined }, dataAttr: string): boolean => {
      if (elRef.current === undefined) {
        elRef.current = document.querySelector(`[data-section="${dataAttr}"]`);
      }
      if (!elRef.current) return false;
      return elRef.current.getBoundingClientRect().top <= window.innerHeight * 0.5;
    };

    const isClosingReadyToLock = (): boolean => {
      if (closingEl === undefined) {
        closingEl = document.querySelector('[data-section="closing"]');
      }
      if (!closingEl) return false;
      // Lock when closing section bottom reaches viewport bottom
      return closingEl.getBoundingClientRect().bottom <= window.innerHeight;
    };

    // ─── rAF tick ───
    const tick = (time: number) => {
      animationId = requestAnimationFrame(tick);

      if (lastTime === 0) {
        lastTime = time;
        return;
      }

      // Cap delta at 50ms to prevent huge jumps when tab is backgrounded
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      // Cinematic lock — pause during closing animation
      if (cinematicLockRef.current || !autoScrollActiveRef.current) {
        accumulated = 0;
        return;
      }

      // Stop at bottom of page
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (atBottom) {
        setIsAutoScrolling(false);
        autoScrollActiveRef.current = false;
        accumulated = 0;
        return;
      }

      // ─── Section-aware speed ───
      // Faster during info sections, slower during story, pause for closing
      const pastEventInfo = isPastSection('eventInfo', { current: eventInfoEl }, 'event-info');
      const pastGallery = isPastSection('gallery', { current: galleryEl }, 'gallery');
      const pastRSVP = isPastSection('rsvp', { current: rsvpEl }, 'rsvp');
      const closingReady = isClosingReadyToLock();

      // If closing is ready to lock, dispatch event and lock
      if (closingReady && !cinematicLockRef.current) {
        window.dispatchEvent(new CustomEvent('closing-sequence-start'));
        cinematicLockRef.current = true;
        accumulated = 0;
        return;
      }

      let speed: number;
      if (pastRSVP) {
        speed = pxPerMs * 2.0; // Fast through RSVP
      } else if (pastGallery) {
        speed = pxPerMs * 1.5; // Moderate through gallery
      } else if (pastEventInfo) {
        speed = pxPerMs * 2.0; // Fast through event info
      } else {
        speed = pxPerMs; // Normal during story scenes
      }

      // Accumulate fractional pixels
      accumulated += delta * speed;

      // Only scroll whole pixels — prevents sub-pixel jitter
      const wholePixels = Math.floor(accumulated);
      if (wholePixels > 0) {
        accumulated -= wholePixels;
        const targetY = window.scrollY + wholePixels;
        window.scrollTo(0, targetY);
      }
    };

    // Start after delay — give time to read the Bismillah
    const startTimeout = setTimeout(() => {
      setIsAutoScrolling(true);
      autoScrollActiveRef.current = true;
      lastTime = 0;
      animationId = requestAnimationFrame(tick);
    }, startDelay);

    // Listen for closing sequence events
    window.addEventListener('closing-sequence-start', onClosingStart);
    window.addEventListener('closing-sequence-complete', onClosingComplete);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      window.removeEventListener('closing-sequence-start', onClosingStart);
      window.removeEventListener('closing-sequence-complete', onClosingComplete);
    };
  }, [enabled, pxPerMs, startDelay, onClosingStart, onClosingComplete]);

  return { isAutoScrolling };
}
