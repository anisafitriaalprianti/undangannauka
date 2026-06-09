'use client';

/**
 * NAUKA PRODUCTION: RSVP Component — Konfirmasi Kehadiran
 *
 * 🔥 Supabase ONLY — no localStorage
 * Guest confirms attendance (Hadir / Tidak Hadir).
 * Persists to Supabase rsvps table.
 *
 * ⚠️ ONLY shown for guests (isGuest === true)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type RSVPStatus } from '@/lib/invitation';
import { saveRSVPToDB, getRSVPFromDB, isSupabaseConfigured } from '@/lib/db';

interface RSVPProps {
  slug: string;
  guestName: string;
  isSyari: boolean;
}

export function RSVP({ slug, guestName, isSyari }: RSVPProps) {
  const [status, setStatus] = useState<RSVPStatus | null>(null);
  const [rsvpTime, setRsvpTime] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing RSVP from Supabase on mount
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    getRSVPFromDB(slug, guestName).then((row) => {
      if (row) {
        setStatus(row.status);
        setRsvpTime(row.rsvp_time);
      }
    }).catch(() => {
      // Silent — guest may not have RSVP'd yet
    });
  }, [slug, guestName]);

  async function handleConfirm(value: RSVPStatus) {
    if (!isSupabaseConfigured()) {
      setError('Koneksi database tidak tersedia');
      return;
    }

    setIsSaving(true);
    setError(null);

    const success = await saveRSVPToDB(slug, guestName, value);

    if (success) {
      setStatus(value);
      setRsvpTime(new Date().toISOString());
    } else {
      setError('Gagal menyimpan konfirmasi. Silakan coba lagi.');
    }

    setIsSaving(false);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 px-6 max-w-lg mx-auto"
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03] text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans mb-4">
          Konfirmasi Kehadiran
        </p>

        <AnimatePresence mode="wait">
          {status ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              {/* Check icon */}
              <div className="mx-auto w-10 h-10 rounded-full bg-[#C6A769]/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <p className="font-serif text-[16px] text-[#1C1C1C] italic">
                {status === 'hadir'
                  ? isSyari
                    ? 'Jazakumullahu khairan'
                    : 'Terima kasih'
                  : 'Terima kasih atas konfirmasinya'}
              </p>

              <p className="text-[12px] text-[#6B6B6B]/50 font-sans">
                {guestName} — {status === 'hadir' ? 'Akan Hadir' : 'Tidak Hadir'}
              </p>

              {/* Change option */}
              <button
                onClick={() => setStatus(null)}
                className="text-[10px] tracking-[0.1em] uppercase text-[#6B6B6B]/30 hover:text-[#6B6B6B]/50 font-sans transition-colors cursor-pointer mt-2"
              >
                Ubah
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="choose"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <p className="text-[13px] text-[#6B6B6B]/50 font-sans mb-5">
                Mohon konfirmasi kehadiran Anda
              </p>

              <div className="flex gap-3 max-w-xs mx-auto">
                {/* Hadir */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleConfirm('hadir')}
                  disabled={isSaving}
                  className="flex-1 py-3 rounded-full text-center text-[11px] tracking-[0.15em] uppercase font-sans bg-[#C6A769] text-white hover:bg-[#B8964F] transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {isSaving ? (
                      <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    Hadir
                  </span>
                </motion.button>

                {/* Tidak Hadir */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleConfirm('tidak')}
                  disabled={isSaving}
                  className="flex-1 py-3 rounded-full text-center text-[11px] tracking-[0.15em] uppercase font-sans bg-[#F6F2EE] border border-[#6B6B6B]/10 text-[#6B6B6B]/50 hover:text-[#6B6B6B]/70 hover:border-[#6B6B6B]/20 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {isSaving ? (
                      <div className="w-3.5 h-3.5 border border-[#6B6B6B]/20 border-t-[#6B6B6B]/50 rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    Tidak Hadir
                  </span>
                </motion.button>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-[11px] text-red-400/70 font-sans mt-2">
                  {error}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
