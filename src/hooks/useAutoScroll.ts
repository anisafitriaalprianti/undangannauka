'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

/* ──────────────────────────────────────────────────────────────
   T4: useAutoScroll — Cinematic auto scroll controller
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Scrolls the page slowly, like watching a film unfold.
   Pauses when user manually scrolls, resumes after idle.
   ────────────────────────────────────────────────────────────── */

interface UseAutoScrollOptions {
  enabled: boolean;
  speed?: number;
  idleResumeDelay?: number;
}

export default function useAutoScroll({
  enabled,
  speed = 0.5,
  idleResumeDelay = 3000,
}: UseAutoScrollOptions) {
  const rafRef = useRef<number | null>(null);
  const userScrollingRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const lastScrollTopRef = useRef(0);
  const programmaticScrollRef = useRef(false);

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
    userScrollingRef.current = false;

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

      // Mark this as programmatic scroll so we don't detect it as user scroll
      programmaticScrollRef.current = true;
      window.scrollBy(0, speed);
      lastScrollTopRef.current = window.scrollY;
      // Reset flag after a tick (scroll event fires synchronously in most browsers)
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });

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

  // Detect user manual scroll
  useEffect(() => {
    if (!enabled) return;

    const handleUserScroll = () => {
      // Skip if this is our own programmatic scroll
      if (programmaticScrollRef.current) return;

      const currentTop = window.scrollY;
      const expectedTop = lastScrollTopRef.current;

      // If scroll position jumped more than 3px from where we left it,
      // it's a user-initiated scroll
      if (Math.abs(currentTop - expectedTop) > 3) {
        userScrollingRef.current = true;
        setIsAutoScrolling(false);

        // Clear any existing idle timer
        if (idleTimerRef.current) {
          clearTimeout(idleTimerRef.current);
        }

        // Set idle timer to resume auto scroll after user stops
        idleTimerRef.current = setTimeout(() => {
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
    };

    window.addEventListener('scroll', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [enabled, idleResumeDelay]);

  return { isAutoScrolling };
}
