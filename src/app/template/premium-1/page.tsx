'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Opening from '@/components/template/premium-1/Opening';
import Cover from '@/components/template/premium-1/Cover';
import Bismillah from '@/components/template/premium-1/Bismillah';
import Scene1 from '@/components/template/premium-1/Scene1';
import Scene2 from '@/components/template/premium-1/Scene2';
import Scene3 from '@/components/template/premium-1/Scene3';
import Scene4 from '@/components/template/premium-1/Scene4';
import Breath from '@/components/template/premium-1/Breath';
import EventInfo from '@/components/template/premium-1/EventInfo';
import Gallery from '@/components/template/premium-1/Gallery';
import RSVP from '@/components/template/premium-1/RSVP';
import Closing from '@/components/template/premium-1/Closing';
import useAutoScroll from '@/hooks/useAutoScroll';

/**
 * Premium-1 Template Page — Islamic Faceless Cinematic
 * Theme: "Kenangan yang perlahan hidup"
 *
 * FLOW:
 * 1. Opening — Dark, "Undangan by Nauka" T5 Handwriting (3.5s)
 * 2. Cover — Names, guest, "Buka Undangan" button
 * 3. [User clicks "Buka Undangan"] → scroll to Bismillah + Auto scroll starts
 * 4. Bismillah — Arabic + Ar-Rum 22 T5 Handwriting
 * 5-8. Story Scenes — T2 PencilBuildUp + T5 Handwriting
 * 9. Breath — Sacred pause
 * 10. Event Info, Gallery, RSVP, Closing
 *
 * AUTO-SCROLL PAUSE:
 * When a scene's handwriting animation is playing, auto-scroll pauses
 * so the user can see the full text reveal before scrolling past.
 */

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function Premium1Page() {
  const [openingComplete, setOpeningComplete] = useState(false);
  const [invitationOpened, setInvitationOpened] = useState(false);

  // Ref to pause auto-scroll during scene animations
  const autoScrollPausedRef = useRef(false);

  const handleOpeningComplete = useCallback(() => {
    setOpeningComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setInvitationOpened(true);
    // Scroll directly to Bismillah section after content renders
    setTimeout(() => {
      const bismillahSection = document.getElementById('bismillah-section');
      if (bismillahSection) {
        bismillahSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  }, []);

  // Auto scroll starts after invitation is opened
  // Pauses automatically when scene animations are in progress
  const { isAutoScrolling } = useAutoScroll({
    enabled: invitationOpened,
    speed: 0.7,
    idleResumeDelay: 2000,
    pausedRef: autoScrollPausedRef,
  });

  // Callback for scenes to pause/resume auto-scroll during animations
  const handleSceneAnimatingChange = useCallback((isAnimating: boolean) => {
    autoScrollPausedRef.current = isAnimating;
  }, []);

  return (
    <main className="template-p1 bg-[#2A2420] min-h-screen">
      {/* ── Phase 1: Opening — cinematic intro ── */}
      <AnimatePresence mode="wait">
        {!openingComplete && (
          <motion.div
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <Opening onComplete={handleOpeningComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 2: Cover — shown after opening ── */}
      <AnimatePresence>
        {openingComplete && !invitationOpened && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <Cover onOpenInvitation={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 3: Full content — after "Buka Undangan" ──
          Cover is NOT repeated here. User scrolls from Bismillah onward. */}
      <AnimatePresence>
        {invitationOpened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            {/* Bismillah Section — first thing user sees after Buka Undangan */}
            <div id="bismillah-section">
              <Bismillah />
            </div>

            {/* Story Mode — Cinematic scenes
                "Kenangan yang perlahan hidup"
                Each scene breathes, has whitespace, emotional pacing.
                Auto-scroll pauses during scene handwriting animations. */}

            {/* Scene I: "Menjaga Dalam Diam" */}
            <Scene1 onAnimatingChange={handleSceneAnimatingChange} />

            {/* Breathing spacer — Scene 1 → Scene 2 */}
            <div
              className="template-p1 relative flex items-center justify-center"
              style={{ backgroundColor: 'var(--p1-ivory)', height: '25vh' }}
            >
              <div
                className="w-[80px] origin-center"
                style={{
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
                  animation: 'p1LineDrawSlow 2.5s ease-out forwards',
                }}
              />
            </div>

            {/* Scene II: "Menitipkan Dalam Sujud" */}
            <Scene2 onAnimatingChange={handleSceneAnimatingChange} />

            {/* Breathing spacer — Scene 2 → Scene 3 */}
            <div
              className="template-p1"
              style={{ backgroundColor: 'var(--p1-ivory)', height: '18vh' }}
            />

            {/* Scene III: Breathing space — emotional pause */}
            <Scene3 onAnimatingChange={handleSceneAnimatingChange} />

            {/* Breathing spacer — Scene 3 → Scene 4 */}
            <div
              className="template-p1 relative flex items-center justify-center"
              style={{ backgroundColor: 'var(--p1-ivory)', height: '12vh' }}
            >
              <div
                className="origin-center"
                style={{
                  width: '1px',
                  height: '3px',
                  background: 'var(--p1-gold)',
                  animation: 'p1VerticalLineDraw 1.5s ease-out forwards',
                }}
              />
            </div>

            {/* Scene IV: "Hari Yang Dijanjikan" — emotional payoff */}
            <Scene4 onAnimatingChange={handleSceneAnimatingChange} />

            {/* Sacred breathing space before event info */}
            <Breath />

            {/* Event Information */}
            <EventInfo />

            {/* Gallery */}
            <Gallery />

            {/* RSVP */}
            <RSVP />

            {/* Closing */}
            <Closing />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
