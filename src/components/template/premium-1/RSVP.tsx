'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';

/* ──────────────────────────────────────────────────────────────
   RSVP — "Konfirmasi Kehadiran"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: Elegant and simple. Avoid dashboard feeling, SaaS form.
   Warm, intimate, like writing a letter to the couple.

   Composition:
   • Warm ivory background (#F5F0E8)
   • "Konfirmasi Kehadiran" title in Playfair Display
   • Simple form: Nama, Jumlah Tamu, Konfirmasi, Pesan
   • Warm gold pill submit button with p1RsvpPulse
   • All inputs: warm border, cream background, elegant focus ring
   • Very generous spacing between fields
   • NO heavy card borders, NO dashboard feel

   Animation: Scroll-triggered fade in
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const dividerDraw: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const formFieldFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Shared input styles ─────────────────────────────────────────
// Elegant warm-toned form fields — no dashboard feel

const inputBaseClass =
  'w-full rounded-lg px-4 py-3 font-sans text-sm sm:text-base outline-none transition-all duration-300';

const inputStyle = {
  backgroundColor: 'rgba(245, 240, 232, 0.6)',
  border: '1px solid rgba(198, 167, 105, 0.15)',
  color: 'var(--p1-warm-brown, #6B5B4A)',
};

const inputFocusClass =
  'focus:border-[rgba(198,167,105,0.4)] focus:shadow-[0_0_0_3px_rgba(198,167,105,0.08)] focus:bg-[rgba(245,240,232,0.8)]';

const labelClass =
  'block font-serif text-sm tracking-wide mb-2 sm:mb-3';

const labelStyle = {
  color: 'var(--p1-warm-brown, #6B5B4A)',
};

// ── Component ───────────────────────────────────────────────────

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  const [attendance, setAttendance] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission — in production this would call an API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full overflow-hidden"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      {/* ── Warm ambient light layers ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 40% at 50% 15%, rgba(198,167,105,0.05) 0%, transparent 55%)',
            'radial-gradient(ellipse 50% 35% at 40% 85%, rgba(198,167,105,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing ambient warm glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 50% 50%, rgba(198,167,105,0.04) 0%, transparent 60%)',
          animation: 'naukaBreathLight 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-lg px-6 py-20 sm:px-8 sm:py-28 md:px-12 md:py-36">
        {/* ── Section title ── */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-4 sm:mb-20"
          variants={titleFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Respon
          </span>

          <h2
            className="font-serif text-2xl font-medium tracking-wide sm:text-3xl md:text-4xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span className="italic">Konfirmasi Kehadiran</span>
          </h2>

          {/* Gold divider — draws from center */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
          />
        </motion.div>

        {/* ── RSVP Form ── */}
        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 sm:gap-10"
            variants={formFieldFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.6, staggerChildren: 0.12 }}
          >
            {/* Nama */}
            <motion.div
              className="flex flex-col"
              variants={formFieldFadeIn}
            >
              <label
                htmlFor="rsvp-nama"
                className={labelClass}
                style={labelStyle}
              >
                Nama
              </label>
              <input
                id="rsvp-nama"
                type="text"
                required
                placeholder="Nama lengkap Anda"
                className={`${inputBaseClass} ${inputFocusClass} placeholder:text-[rgba(107,91,74,0.3)]`}
                style={inputStyle}
              />
            </motion.div>

            {/* Jumlah Tamu */}
            <motion.div
              className="flex flex-col"
              variants={formFieldFadeIn}
            >
              <label
                htmlFor="rsvp-jumlah"
                className={labelClass}
                style={labelStyle}
              >
                Jumlah Tamu
              </label>
              <select
                id="rsvp-jumlah"
                required
                defaultValue=""
                className={`${inputBaseClass} ${inputFocusClass} appearance-none cursor-pointer`}
                style={{
                  ...inputStyle,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238B7D6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
              >
                <option value="" disabled style={{ color: 'rgba(107,91,74,0.3)' }}>
                  Pilih jumlah
                </option>
                <option value="1">1 orang</option>
                <option value="2">2 orang</option>
                <option value="3">3 orang</option>
              </select>
            </motion.div>

            {/* Konfirmasi Kehadiran — Radio */}
            <motion.div
              className="flex flex-col"
              variants={formFieldFadeIn}
            >
              <span
                className={labelClass}
                style={labelStyle}
              >
                Konfirmasi
              </span>
              <div className="flex gap-6 sm:gap-8">
                {/* Hadir */}
                <label className="group flex items-center gap-3 cursor-pointer">
                  <span className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="rsvp-konfirmasi"
                      value="hadir"
                      required
                      checked={attendance === 'hadir'}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300"
                      style={{
                        borderColor:
                          attendance === 'hadir'
                            ? 'var(--p1-gold, #C6A769)'
                            : 'rgba(198, 167, 105, 0.2)',
                        backgroundColor:
                          attendance === 'hadir'
                            ? 'rgba(198, 167, 105, 0.08)'
                            : 'transparent',
                      }}
                    >
                      {attendance === 'hadir' && (
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: 'var(--p1-gold, #C6A769)',
                          }}
                        />
                      )}
                    </span>
                  </span>
                  <span
                    className="font-serif text-sm tracking-wide transition-colors duration-300"
                    style={{
                      color:
                        attendance === 'hadir'
                          ? 'var(--p1-warm-brown, #6B5B4A)'
                          : 'var(--p1-muted, #6B6B6B)',
                    }}
                  >
                    Hadir
                  </span>
                </label>

                {/* Berhalangan */}
                <label className="group flex items-center gap-3 cursor-pointer">
                  <span className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="rsvp-konfirmasi"
                      value="berhalangan"
                      required
                      checked={attendance === 'berhalangan'}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300"
                      style={{
                        borderColor:
                          attendance === 'berhalangan'
                            ? 'var(--p1-gold, #C6A769)'
                            : 'rgba(198, 167, 105, 0.2)',
                        backgroundColor:
                          attendance === 'berhalangan'
                            ? 'rgba(198, 167, 105, 0.08)'
                            : 'transparent',
                      }}
                    >
                      {attendance === 'berhalangan' && (
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: 'var(--p1-gold, #C6A769)',
                          }}
                        />
                      )}
                    </span>
                  </span>
                  <span
                    className="font-serif text-sm tracking-wide transition-colors duration-300"
                    style={{
                      color:
                        attendance === 'berhalangan'
                          ? 'var(--p1-warm-brown, #6B5B4A)'
                          : 'var(--p1-muted, #6B6B6B)',
                    }}
                  >
                    Berhalangan
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Pesan untuk kedua mempelai — Optional */}
            <motion.div
              className="flex flex-col"
              variants={formFieldFadeIn}
            >
              <label
                htmlFor="rsvp-pesan"
                className={labelClass}
                style={labelStyle}
              >
                Pesan untuk kedua mempelai
                <span
                  className="ml-2 text-xs font-sans"
                  style={{ color: 'var(--p1-muted, #6B6B6B)' }}
                >
                  (opsional)
                </span>
              </label>
              <textarea
                id="rsvp-pesan"
                rows={4}
                placeholder="Doa dan harapan untuk kedua mempelai…"
                className={`${inputBaseClass} ${inputFocusClass} resize-none placeholder:text-[rgba(107,91,74,0.3)]`}
                style={inputStyle}
              />
            </motion.div>

            {/* Submit button — warm gold, pill-shaped, p1RsvpPulse */}
            <motion.div
              className="mt-2 flex justify-center"
              variants={formFieldFadeIn}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative rounded-full px-10 py-3 font-serif text-sm tracking-widest uppercase transition-all duration-300 sm:px-12 sm:py-3.5 sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--p1-gold, #C6A769)',
                  color: '#FFFFFF',
                  animation: 'p1RsvpPulse 3s ease-in-out infinite',
                  boxShadow:
                    '0 2px 8px rgba(198,167,105,0.2), 0 8px 24px rgba(198,167,105,0.1)',
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Mengirim…
                  </span>
                ) : (
                  'Kirim'
                )}
              </button>
            </motion.div>
          </motion.form>
        ) : (
          /* ── Success state — warm, intimate confirmation ── */
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative gold mark */}
            <div
              className="h-[1px] w-[40px]"
              style={{
                background:
                  'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
              }}
            />

            <p
              className="font-serif italic text-lg sm:text-xl"
              style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
            >
              Terima kasih atas konfirmasi Anda
            </p>

            <p
              className="font-serif text-sm leading-relaxed tracking-wide"
              style={{ color: 'var(--p1-muted, #6B6B6B)' }}
            >
              Doa dan restu Anda adalah karunia yang kami harapkan.
            </p>

            {/* Decorative gold mark */}
            <div
              className="h-[1px] w-[40px]"
              style={{
                background:
                  'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
              }}
            />
          </motion.div>
        )}
      </div>

      {/* ── Bottom edge — soft fade into next section ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top edge — soft fade from previous section ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
