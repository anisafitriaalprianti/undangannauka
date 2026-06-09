'use client';

import { motion } from 'framer-motion';

/* ============================================================
   PREMIUM-1 COVER — "Kenangan yang perlahan hidup"
   Islamic Faceless Cinematic Wedding Invitation

   Cover with:
   - Couple names
   - Guest name (Kepada Yth.)
   - "Buka Undangan" button → triggers story mode
   - CSS moon, curtains, dust particles
   ============================================================ */

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// --- Dust Particles Data ---
const dustParticles = [
  { left: '15%', top: '20%', size: 2, delay: 0, duration: 8 },
  { left: '30%', top: '15%', size: 1.5, delay: 1.2, duration: 10 },
  { left: '45%', top: '25%', size: 2.5, delay: 0.6, duration: 9 },
  { left: '60%', top: '18%', size: 1.8, delay: 2.0, duration: 11 },
  { left: '75%', top: '30%', size: 2, delay: 0.8, duration: 8.5 },
  { left: '20%', top: '40%', size: 1.5, delay: 1.5, duration: 9.5 },
  { left: '55%', top: '35%', size: 2.2, delay: 0.3, duration: 10.5 },
  { left: '70%', top: '45%', size: 1.8, delay: 1.8, duration: 8 },
  { left: '35%', top: '50%', size: 2, delay: 2.5, duration: 11.5 },
  { left: '85%', top: '22%', size: 1.5, delay: 0.9, duration: 9 },
  { left: '10%', top: '55%', size: 1.8, delay: 1.1, duration: 10 },
  { left: '50%', top: '60%', size: 2, delay: 2.2, duration: 8.5 },
  { left: '25%', top: '70%', size: 1.5, delay: 0.4, duration: 9.5 },
  { left: '65%', top: '65%', size: 2.2, delay: 1.7, duration: 11 },
  { left: '40%', top: '75%', size: 1.8, delay: 3.0, duration: 8 },
];

interface CoverProps {
  onOpenInvitation: () => void;
}

export default function Cover({ onOpenInvitation }: CoverProps) {
  return (
    <section
      className="template-p1 relative w-full min-h-dvh overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'var(--p1-ivory)' }}
    >
      {/* === Warm ambient gradient layers === */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(198, 167, 105, 0.04) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 80%, rgba(138, 155, 174, 0.03) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 70% at 50% 10%, rgba(198, 167, 105, 0.05) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* === CSS MOON === */}
      <motion.div
        className="absolute pointer-events-none z-[2]"
        style={{
          top: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(100px, 28vw, 180px)',
          height: 'clamp(100px, 28vw, 180px)',
        }}
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-30%',
            background:
              'radial-gradient(circle at center, rgba(198, 167, 105, 0.15) 0%, rgba(198, 167, 105, 0.05) 40%, transparent 70%)',
            animation: 'p1MoonPulse 6s ease-in-out infinite, p1WarmDrift 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 45% 40%, rgba(245, 235, 215, 0.35) 0%, rgba(220, 200, 165, 0.15) 40%, rgba(198, 167, 105, 0.06) 70%, transparent 100%)',
            animation: 'p1MoonPulse 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '25%',
            background:
              'radial-gradient(circle at 40% 35%, rgba(255, 250, 235, 0.20) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* === CSS CURTAINS === */}
      {/* Left curtain */}
      <motion.div
        className="absolute pointer-events-none z-[3]"
        style={{
          top: 0,
          left: 0,
          width: 'clamp(60px, 18vw, 140px)',
          height: '100%',
          animation: 'p1CurtainSway 10s ease-in-out infinite',
        }}
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(139, 125, 107, 0.06) 0%, rgba(139, 125, 107, 0.03) 40%, rgba(139, 125, 107, 0.01) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(198, 167, 105, 0.015) 20%, transparent 25%, rgba(198, 167, 105, 0.01) 45%, transparent 50%, rgba(198, 167, 105, 0.015) 70%, transparent 75%, rgba(198, 167, 105, 0.01) 90%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Right curtain */}
      <motion.div
        className="absolute pointer-events-none z-[3]"
        style={{
          top: 0,
          right: 0,
          width: 'clamp(60px, 18vw, 140px)',
          height: '100%',
          transform: 'scaleX(-1)',
          animation: 'p1CurtainSway 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(139, 125, 107, 0.06) 0%, rgba(139, 125, 107, 0.03) 40%, rgba(139, 125, 107, 0.01) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(198, 167, 105, 0.015) 20%, transparent 25%, rgba(198, 167, 105, 0.01) 45%, transparent 50%, rgba(198, 167, 105, 0.015) 70%, transparent 75%, rgba(198, 167, 105, 0.01) 90%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* === FLOATING DUST PARTICLES === */}
      <div className="absolute inset-0 pointer-events-none z-[4]" aria-hidden="true">
        {dustParticles.map((particle, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: 'rgba(198, 167, 105, 0.4)',
              animation: `p1DustFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* === MOONLIGHT BEAM === */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'linear-gradient(135deg, transparent 45%, rgba(198, 167, 105, 0.02) 48%, rgba(198, 167, 105, 0.04) 50%, rgba(198, 167, 105, 0.02) 52%, transparent 55%)',
          animation: 'p1WarmDrift 16s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* === CENTER CONTENT === */}
      <div className="relative z-[5] flex flex-col items-center justify-center text-center px-6 sm:px-8 w-full">
        {/* Bismillah */}
        <motion.p
          className="font-serif italic text-sm sm:text-base tracking-widest mb-8 sm:mb-10"
          style={{ color: 'var(--p1-taupe)' }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.8 }}
        >
          Bismillahirrahmanirrahim
        </motion.p>

        {/* Guest Name */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE, delay: 1.0 }}
        >
          <p
            className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-1"
            style={{ color: 'var(--p1-muted)' }}
          >
            Kepada Yth.
          </p>
          <p
            className="font-serif text-base sm:text-lg tracking-wide"
            style={{ color: 'var(--p1-warm-brown)' }}
          >
            Bapak/Ibu/Saudara/i
          </p>
          <p
            className="font-serif italic text-lg sm:text-xl mt-1"
            style={{ color: 'var(--p1-ink)' }}
          >
            Tamu Undangan
          </p>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          className="flex flex-col items-center gap-1 sm:gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: EASE, delay: 1.4 }}
        >
          <h1
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wide"
            style={{ color: 'var(--p1-ink)' }}
          >
            Arka
          </h1>
          <span
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl"
            style={{ color: 'var(--p1-gold)' }}
          >
            &amp;
          </span>
          <h1
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wide"
            style={{ color: 'var(--p1-ink)' }}
          >
            Dyana
          </h1>
        </motion.div>

        {/* Gold Divider Line */}
        <motion.div
          className="mt-6 sm:mt-8 mb-5 sm:mb-6"
          style={{ originX: '50%', originY: '50%' }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE, delay: 2.0 }}
        >
          <div
            className="h-[1px] mx-auto"
            style={{
              width: '60px',
              background:
                'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
            }}
          />
        </motion.div>

        {/* Wedding Date */}
        <motion.p
          className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase mb-8"
          style={{ color: 'var(--p1-muted)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE, delay: 2.4 }}
        >
          28 Desember 2025
        </motion.p>

        {/* Buka Undangan Button */}
        <motion.button
          onClick={onOpenInvitation}
          className="mt-4 px-8 py-3 rounded-full font-serif italic text-sm sm:text-base tracking-widest transition-all duration-500 cursor-pointer"
          style={{
            color: 'var(--p1-ivory)',
            background: 'linear-gradient(135deg, var(--p1-gold-dim) 0%, var(--p1-gold) 50%, var(--p1-gold-light) 100%)',
            border: '1px solid rgba(198, 167, 105, 0.3)',
            boxShadow: '0 2px 12px rgba(198, 167, 105, 0.2)',
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE, delay: 2.8 }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 4px 20px rgba(198, 167, 105, 0.3)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          Buka Undangan
        </motion.button>
      </div>

      {/* === TEXTURE OVERLAYS === */}
      <div className="nauka-paper absolute inset-0 pointer-events-none z-[6]" />
      <div className="nauka-ink-wash absolute inset-0 pointer-events-none z-[6]" />
      <div className="nauka-grain absolute inset-0 pointer-events-none z-[7]" />
      <div className="nauka-vignette absolute inset-0 pointer-events-none z-[8]" />
    </section>
  );
}
