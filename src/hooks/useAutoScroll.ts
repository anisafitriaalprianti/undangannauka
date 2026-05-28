'use client';

import { useEffect, useRef, useState } from 'react';

/* ──────────────────────────────────────────────────────────────
   T4: useAutoScroll — Time accumulator approach
   Adapted from Irwan-Anira auto-scroll technique

   Key differences from previous implementation:
   1. Time accumulator: accumulates fractional pixels, only scrolls
      whole pixels via window.scrollTo() — no sub-pixel jitter
   2. Delta time with 50ms cap: prevents jumps when tab is backgrounded
   3. window.scrollTo() instead of scrollBy(): more reliable, no
      fighting with browser scroll events
   4. No user scroll detection needed: Irwan-Anira doesn't detect
      manual scroll at all — the auto-scroll is gentle enough that
      it doesn't interfere. User can scroll freely anytime.
   5. Simple toggle: enabled/disabled via prop
   ────────────────────────────────────────────────────────────── */

interface UseAutoScrollOptions {
  enabled: boolean;
  /** Pixels per millisecond. 0.025 = ~25px/sec (Irwan-Anira base) */
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

  useEffect(() => {
    if (!enabled) {
      setIsAutoScrolling(false);
      return;
    }

    let animationId: number;
    let lastTime = 0;
    let accumulated = 0;

    const tick = (time: number) => {
      animationId = requestAnimationFrame(tick);

      if (lastTime === 0) {
        lastTime = time;
        return;
      }

      // Cap delta at 50ms to prevent huge jumps when tab is backgrounded
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      // Stop at bottom of page
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (atBottom) {
        setIsAutoScrolling(false);
        return;
      }

      // Accumulate fractional pixels
      accumulated += delta * pxPerMs;

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
      lastTime = 0;
      animationId = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, pxPerMs, startDelay]);

  return { isAutoScrolling };
}
