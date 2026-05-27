'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Opening from '@/components/template/premium-1/Opening';
import Cover from '@/components/template/premium-1/Cover';
import Scene1 from '@/components/template/premium-1/Scene1';
import Scene2 from '@/components/template/premium-1/Scene2';
import Scene3 from '@/components/template/premium-1/Scene3';
import Scene4 from '@/components/template/premium-1/Scene4';
import Breath from '@/components/template/premium-1/Breath';
import EventInfo from '@/components/template/premium-1/EventInfo';
import Gallery from '@/components/template/premium-1/Gallery';
import RSVP from '@/components/template/premium-1/RSVP';
import Closing from '@/components/template/premium-1/Closing';

/**
 * Premium-1 Template Page — Islamic Faceless Cinematic
 * Theme: "Kenangan yang perlahan hidup"
 *
 * Flow:
 * 1. Opening (3-5s cinematic intro, then auto-transition)
 * 2. Cover (main invitation with names, moon, curtains)
 * 3-6. Story Scenes (slow cinematic storytelling)
 * 7. Event Info (minimalist, warm)
 * 8. Gallery (simple cinematic gallery)
 * 9. RSVP (elegant form)
 * 10. Closing (warm emotional ending)
 */

const sceneTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Premium1Page() {
  const [openingComplete, setOpeningComplete] = useState(false);

  const handleOpeningComplete = useCallback(() => {
    setOpeningComplete(true);
    // Scroll to top of content smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="template-p1 bg-[#2A2420] min-h-screen">
      {/* Opening — cinematic intro that auto-transitions */}
      <AnimatePresence mode="wait">
        {!openingComplete && (
          <motion.div
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Opening onComplete={handleOpeningComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — appears after opening completes */}
      <AnimatePresence>
        {openingComplete && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Cover — The invitation face */}
            <Cover />

            {/* Story Mode — Slow cinematic scenes
                "Kenangan yang perlahan hidup"
                Each scene breathes, has whitespace, emotional pacing.
                Transitions feel like sketch → cinematic scene. */}

            {/* Scene I: "Menjaga Dalam Diam" */}
            <Scene1 />

            {/* Breathing spacer — Scene 1 → Scene 2
                Tall warm ivory space with a thin horizontal gold line
                that draws slowly from center. Emotional distance. */}
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
            <Scene2 />

            {/* Breathing spacer — Scene 2 → Scene 3
                Medium pure breathing whitespace. Nothing else.
                Just the warm ivory background. */}
            <div
              className="template-p1"
              style={{ backgroundColor: 'var(--p1-ivory)', height: '18vh' }}
            />

            {/* Scene III: Breathing space — emotional pause */}
            <Scene3 />

            {/* Breathing spacer — Scene 3 → Scene 4
                Short space with a very thin vertical gold line.
                Building tension toward the payoff. */}
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
            <Scene4 />

            {/* PRIORITY 5: Breath — sacred breathing space before event info */}
            <Breath />

            {/* Event Information — clear, elegant, warm */}
            <EventInfo />

            {/* Gallery — simple cinematic gallery */}
            <Gallery />

            {/* RSVP — elegant confirmation */}
            <RSVP />

            {/* Closing — warm emotional ending
                Returns to the opening's darkness, completing the circle */}
            <Closing />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
