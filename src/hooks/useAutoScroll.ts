'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

/* ──────────────────────────────────────────────────────────────
   T4: useAutoScroll — Cinematic auto scroll controller
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Scrolls the page slowly, like watching a film unfold.
   Pauses when user manually scrolls, resumes after idle.

   Props:
   - enabled: whether auto scroll is active
   - speed: pixels per frame (default 0.4 — very slow, cinematic)
   - idleResumeDelay: ms to wait after user scroll before resuming (default 3000)
   ────────────────────────────────────────────────────────────── */

interface UseAutoScrollOptions {
  enabled: boolean;
  speed?: number;
  idleResumeDelay?: number;
}

export default function useAutoScroll({
  enabled,
  speed = 0.4,
  idleResumeDelay = 3000,
}: UseAutoScrollOptions) {
  const rafRef = useRef<number | null>(null);
  const userScrollingRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const lastScrollTopRef = useRef(0);

  // Detect user manual scroll
  const handleUserScroll = useCallback(() => {
    // Check if this is a programmatic scroll (from our RAF)
    const currentTop = window.scrollY;
    const expectedTop = lastScrollTopRef.current;

    // If scroll position jumped more than 2px from where we left it,
    // it's likely a user-initiated scroll
    if (Math.abs(currentTop - expectedTop) > 2) {
      userScrollingRef.current = true;
      setIsAutoScrolling(false);

      // Clear any existing idle timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // Set idle timer to resume auto scroll after user stops
      idleTimerRef.current = setTimeout(() => {
        // Check if we've reached the bottom
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 50;

        if (!atBottom) {
          userScrollingRef.current = false;
          lastScrollTopRef.current = window.scrollY;
          setIsAutoScrolling(true);
        }
      }, idleResumeDelay);
    }
  }, [idleResumeDelay]);

  // Auto scroll loop
  useEffect(() => {
    if (!enabled) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setIsAutoScrolling(false);
      return;
    }

    setIsAutoScrolling(true);
    lastScrollTopRef.current = window.scrollY;

    const scroll = () => {
      // Don't scroll if user is manually scrolling
      if (userScrollingRef.current) {
        rafRef.current = requestAnimationFrame(scroll);
        return;
      }

      // Check if we've reached the bottom
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 50;

      if (atBottom) {
        setIsAutoScrolling(false);
        return;
      }

      // Scroll by speed pixels
      window.scrollBy(0, speed);
      lastScrollTopRef.current = window.scrollY;

      rafRef.current = requestAnimationFrame(scroll);
    };

    rafRef.current = requestAnimationFrame(scroll);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, speed]);

  // Listen for user scroll events
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [enabled, handleUserScroll]);

  return { isAutoScrolling };
}
