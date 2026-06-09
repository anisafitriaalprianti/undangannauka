'use client';

/**
 * NAUKA PRODUCTION: RSVP Dashboard — Live owner view
 *
 * 🔥 Supabase ONLY — no localStorage
 * - Loads guests + RSVPs from Supabase
 * - Realtime subscription for live updates
 * - Shows: total tamu, hadir, tidak, belum RSVP, detail list
 *
 * ⚠️ ONLY shown for owner (not guest)
 */

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getGuestsFromDB,
  getAllRSVPsFromDB,
  subscribeToRSVPs,
  isSupabaseConfigured,
  type GuestRow,
  type RSVPRow,
} from '@/lib/db';

interface RSVPDashboardProps {
  slug: string;
}

interface MergedGuest {
  name: string;
  rsvp: 'hadir' | 'tidak' | null;
  rsvpTime: string | null;
}

export function RSVPDashboard({ slug }: RSVPDashboardProps) {
  const [guests, setGuests] = useState<MergedGuest[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Supabase
  const loadData = useCallback(async () => {
    const [guestRows, rsvpRows] = await Promise.all([
      getGuestsFromDB(slug),
      getAllRSVPsFromDB(slug),
    ]);

    if (!guestRows && !rsvpRows) {
      setIsLoading(false);
      return;
    }

    // Build RSVP lookup map
    const rsvpMap = new Map<string, RSVPRow>();
    if (rsvpRows) {
      rsvpRows.forEach((r) => {
        rsvpMap.set(r.guest_name, r);
      });
    }

    // Merge guests with RSVPs
    const merged: MergedGuest[] = [];

    if (guestRows) {
      // Start with all registered guests
      guestRows.forEach((g) => {
        const rsvp = rsvpMap.get(g.name);
        merged.push({
          name: g.name,
          rsvp: rsvp?.status || null,
          rsvpTime: rsvp?.rsvp_time || null,
        });
      });
    }

    // Add any RSVP entries for guests not in the guest list (direct link visitors)
    if (rsvpRows) {
      const guestNames = new Set((guestRows || []).map((g) => g.name));
      rsvpRows.forEach((r) => {
        if (!guestNames.has(r.guest_name)) {
          merged.push({
            name: r.guest_name,
            rsvp: r.status,
            rsvpTime: r.rsvp_time,
          });
        }
      });
    }

    // Sort: RSVP'd first (hadir → tidak), then belum
    merged.sort((a, b) => {
      if (a.rsvp && !b.rsvp) return -1;
      if (!a.rsvp && b.rsvp) return 1;
      if (a.rsvp === 'hadir' && b.rsvp === 'tidak') return -1;
      if (a.rsvp === 'tidak' && b.rsvp === 'hadir') return 1;
      return 0;
    });

    setGuests(merged);
    setIsEmpty(merged.length === 0);
    setIsLoading(false);
    setIsLive(true);
  }, [slug]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    // Initial load
    loadData();

    // Realtime subscription
    const unsubscribe = subscribeToRSVPs(slug, () => {
      loadData();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [slug, loadData]);

  // Stats
  const hadir = guests.filter((g) => g.rsvp === 'hadir');
  const tidak = guests.filter((g) => g.rsvp === 'tidak');
  const belum = guests.filter((g) => g.rsvp === null);
  const totalRSVP = hadir.length + tidak.length;

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-10 px-6 max-w-lg mx-auto"
      >
        <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03] text-center">
          <div className="w-6 h-6 border-2 border-[#C6A769]/20 border-t-[#C6A769] rounded-full animate-spin mx-auto" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B]/30 font-sans mt-3">
            Memuat dashboard...
          </p>
        </div>
      </motion.section>
    );
  }

  if (isEmpty) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="py-10 px-6 max-w-lg mx-auto"
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03]">
        <div className="flex items-center justify-center gap-2 mb-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans">
            Dashboard RSVP
          </p>
          {isLive && (
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[8px] tracking-[0.15em] uppercase text-green-500/50 font-sans">
                Live
              </span>
            </span>
          )}
        </div>

        {/* Stats — 4 columns */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="text-center py-3 rounded-xl bg-[#F6F2EE]">
            <p className="font-serif text-2xl text-[#1C1C1C] italic">{guests.length}</p>
            <p className="text-[8px] tracking-[0.15em] uppercase text-[#6B6B6B]/40 font-sans mt-0.5">
              Total
            </p>
          </div>
          <div className="text-center py-3 rounded-xl bg-[#C6A769]/5">
            <p className="font-serif text-2xl text-[#C6A769] italic">{hadir.length}</p>
            <p className="text-[8px] tracking-[0.15em] uppercase text-[#C6A769]/50 font-sans mt-0.5">
              Hadir
            </p>
          </div>
          <div className="text-center py-3 rounded-xl bg-[#F6F2EE]">
            <p className="font-serif text-2xl text-[#6B6B6B]/40 italic">{tidak.length}</p>
            <p className="text-[8px] tracking-[0.15em] uppercase text-[#6B6B6B]/30 font-sans mt-0.5">
              Tidak
            </p>
          </div>
          <div className="text-center py-3 rounded-xl bg-[#F6F2EE]">
            <p className="font-serif text-2xl text-[#6B6B6B]/20 italic">{belum.length}</p>
            <p className="text-[8px] tracking-[0.15em] uppercase text-[#6B6B6B]/20 font-sans mt-0.5">
              Belum
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {guests.length > 0 && (
          <div className="w-full h-1.5 rounded-full bg-[#F6F2EE] overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(hadir.length / guests.length) * 100}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-[#C6A769]"
            />
          </div>
        )}

        {/* Guest list */}
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          <AnimatePresence>
            {guests.map((guest, i) => (
              <motion.div
                key={guest.name}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#F6F2EE]/60 transition-colors"
              >
                {/* Status indicator */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  guest.rsvp === 'hadir' ? 'bg-[#C6A769]'
                    : guest.rsvp === 'tidak' ? 'bg-[#6B6B6B]/20'
                    : 'bg-[#6B6B6B]/8'
                }`} />

                {/* Name */}
                <span className="text-[13px] text-[#1C1C1C] font-sans flex-1 truncate">
                  {guest.name}
                </span>

                {/* Status label */}
                <span className={`text-[10px] tracking-[0.1em] uppercase font-sans shrink-0 ${
                  guest.rsvp === 'hadir'
                    ? 'text-[#C6A769]/70'
                    : guest.rsvp === 'tidak'
                      ? 'text-[#6B6B6B]/30'
                      : 'text-[#6B6B6B]/15'
                }`}>
                  {guest.rsvp === 'hadir' ? 'Hadir' : guest.rsvp === 'tidak' ? 'Tidak Hadir' : 'Belum'}
                </span>

                {/* Time */}
                {guest.rsvpTime && (
                  <span className="text-[9px] text-[#6B6B6B]/20 font-sans shrink-0">
                    {formatRSVPTime(guest.rsvpTime)}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Connection status */}
        <p className="text-[9px] text-[#6B6B6B]/15 font-sans text-center mt-4">
          {isLive ? `Realtime via Supabase — ${totalRSVP}/${guests.length} merespons` : 'Memuat data...'}
        </p>
      </div>
    </motion.section>
  );
}

/** Format ISO time to short display */
function formatRSVPTime(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return 'Baru';
    if (diffMin < 60) return `${diffMin}m`;
    if (diffHr < 24) return `${diffHr}j`;
    if (diffDay < 7) return `${diffDay}h`;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}
