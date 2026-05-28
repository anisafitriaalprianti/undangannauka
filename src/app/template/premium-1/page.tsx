'use client';

import { useState, useCallback } from 'react';
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
import CinematicAmbience from '@/components/template/premium-1/CinematicAmbience';

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
 * AUTO-SCROLL: Irwan-Anira style time accumulator approach.
 * Starts 8s after "Buka Undangan" to give time to read Bismillah.
 * Speed: ~25px/sec (0.025 px/ms).
 */

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function Premium1Page() {
  const [openingComplete, setOpeningComplete] = useState(false);
  const [invitationOpened, setInvitationOpened] = useState(false);

  const handleOpeningComplete = useCallback(() => {
    setOpeningComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setInvitationOpened(true);
    // Scroll to Bismillah section after content renders
    setTimeout(() => {
      const bismillahSection = document.getElementById('bismillah-section');
      if (bismillahSection) {
        bismillahSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }, []);

  // Auto-scroll: Irwan-Anira style
  // Starts 8s after invitation is opened (time to read Bismillah)
  // Speed: 0.025 px/ms ≈ 25px/sec
  useAutoScroll({
    enabled: invitationOpened,
    pxPerMs: 0.025,
    startDelay: 8000,
  });

  return (
    <main className="template-p1 bg-[#2A2420] min-h-screen">
      {/* ── T6: Cinematic Ambience — procedural ambient soundscape ── */}
      <CinematicAmbience active={invitationOpened} />

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

      {/* ── Phase 3: Full content — after "Buka Undangan" ── */}
      <AnimatePresence>
        {invitationOpened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            {/* Bismillah Section */}
            <div id="bismillah-section">
              <Bismillah />
            </div>

            {/* Scene I */}
            <Scene1 />

            {/* ═══ T9: THE VOID — keheningan antara menahan dan menitipkan ═══ */}
            <section className="relative w-full overflow-hidden h-[15vh] sm:h-[30vh]" style={{ backgroundColor: '#1A1614' }}>
              <div className="pointer-events-none absolute inset-0" style={{
                background: 'radial-gradient(ellipse 30% 25% at 50% 50%, rgba(198,167,105,0.03) 0%, transparent 70%)',
              }} />
            </section>

            {/* Scene II */}
            <Scene2 />

            {/* ═══ T9: THE VOID — keheningan terberat, sebelum rindu ═══ */}
            <section className="relative w-full overflow-hidden h-[20vh] sm:h-[40vh]" style={{ backgroundColor: '#1A1614' }}>
              <div className="pointer-events-none absolute inset-0" style={{
                background: 'radial-gradient(ellipse 25% 20% at 50% 50%, rgba(198,167,105,0.02) 0%, transparent 70%)',
              }} />
            </section>

            {/* Scene III */}
            <Scene3 />

            {/* ═══ T9: THE VOID — napas terakhir sebelum janji terjawab ═══ */}
            <section className="relative w-full overflow-hidden h-[12vh] sm:h-[25vh]" style={{ backgroundColor: '#1A1614' }}>
              <div className="pointer-events-none absolute inset-0" style={{
                background: 'radial-gradient(ellipse 35% 30% at 50% 50%, rgba(212,186,130,0.04) 0%, transparent 70%)',
              }} />
            </section>

            {/* Scene IV */}
            <Scene4 />

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
