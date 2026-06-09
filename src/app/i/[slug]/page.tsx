'use client';

console.log("SLUG PAGE ACTIVE");

/**
 * NAUKA PRODUCTION: Invitation View Page
 *
 * 🔥 Single Data Source: Supabase
 * - Invitation data: Supabase first, localStorage fallback
 * - Guest detection: URL ?to= param (source of truth)
 * - Guest mode: No share buttons, only RSVP
 * - Owner mode: ShareButtons + GuestUpload + RSVPDashboard
 * - No local guest/RSVP caching
 */

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
// import { templates } from '@/registry/templates';
import { loadInvitation, getGuestName, type InvitationData } from '@/lib/invitation';
import { getInvitationFromDB, isSupabaseConfigured } from '@/lib/db';
// import { ShareButtons } from '@/components/ShareButtons';
// import { RSVP } from '@/components/RSVP';
// import { RSVPDashboard } from '@/components/RSVPDashboard';

const slowEase = [0.16, 1, 0.3, 1];

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  try {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  } catch {
    return timeStr;
  }
}

export default function InvitationClient() {
  return <div>SLUG WORKS OK</div>;
}
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 GUEST DETECTION: URL ?to= is the source of truth
  // If URL has ?to= → this is a guest viewing a shared link → NO share buttons
  // If URL has NO ?to= → this is the owner → SHOW share buttons
  const isGuest = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.has('to');
  }, []);

  // Try to find matching template
  const template = null;

  // ⚠️ ALL hooks and derived values MUST be before any early returns
  // This satisfies React's Rules of Hooks (consistent call order)

  // Determine display data: from data or fallback
  const groomName = data?.groomName || 'Arka';
  const brideName = data?.brideName || 'Dyana';
  const dateDisplay = data?.date ? formatDate(data.date) : 'Minggu, 28 Desember 2025';
  const timeDisplay = data?.time ? formatTime(data.time) : '10:00 - 14:00 WIB';
  const locationDisplay = data?.location || 'Graha Sabha, Jakarta Selatan';
  const personalMessage = data?.personalMessage || 'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir';

  // Determine if Syar'i mode — from data.mode or template definition
  const invitationMode = data?.mode || (slug.includes('syari') ? 'syari' : 'universal');
  const isSyari = invitationMode === 'syari';

  // Guest personalization: read ?to= from URL
  const guestName = useMemo(() => getGuestName(), []);

  useEffect(() => {
    async function loadData() {
      // 1. Try Supabase first (production)
      if (isSupabaseConfigured()) {
        const dbData = await getInvitationFromDB(slug);
        if (dbData) {
          setData(dbData);
          setIsLoading(false);
          return;
        }
      }

      // 2. Fallback: localStorage (for create flow before sync)
      const result = loadInvitation(slug);
      if (result.status === 'ok' && result.data) {
        setData(result.data);
      }

      setIsLoading(false);
    }

    loadData();
  }, [slug]);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-[#C6A769]/20 border-t-[#C6A769] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]/40 font-sans">
            Memuat undangan...
          </p>
        </motion.div>
      </main>
    );
  }

  // No data and no matching template
  if (!data && !template && false) {
    return (
      <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl text-[#1C1C1C] italic mb-3">
            Undangan Tidak Ditemukan
          </h1>
          <p className="text-[13px] text-[#6B6B6B]/60 mb-6">
            Undangan &quot;{slug}&quot; belum tersedia atau telah kedaluwarsa.
          </p>
          <a
            href="/create"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#C6A769] font-sans hover:text-[#D4BA82] transition-colors duration-300"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            Buat Undangan
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F2EE]">
      {/* Bismillah — shown for Syar'i templates */}
      {isSyari && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: slowEase }}
          className="py-16 text-center"
        >
          <p className="text-[20px] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-[12px] text-[#6B6B6B]/50 font-sans">
            Bismillahirrahmanirrahim
          </p>
        </motion.section>
      )}

      {/* Guest Greeting — personalized if ?to= is present */}
      <motion.section
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: slowEase }}
        className="pt-8 pb-2 text-center px-6"
      >
        {guestName ? (
          <>
            <p className="text-[12px] tracking-[0.15em] uppercase text-[#6B6B6B]/50 font-sans mb-1">
              Kepada Yth.
            </p>
            <p className="font-serif text-[18px] text-[#1C1C1C] italic">
              {guestName}
            </p>
          </>
        ) : (
          <p className="text-[12px] tracking-[0.15em] uppercase text-[#6B6B6B]/50 font-sans">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
        )}
      </motion.section>

      {/* Cover */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: slowEase }}
        className="py-12 text-center px-6"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans mb-4">
          The Wedding Of
        </p>
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1C1C] italic leading-[1.15] mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {groomName} &amp; {brideName}
        </h1>
        <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#C6A769]/40 to-transparent my-6" />
        <p className="text-[13px] text-[#6B6B6B]/60 font-sans">
          {dateDisplay}
        </p>
      </motion.section>

      {/* Event Info */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: slowEase }}
        className="py-12 px-6 max-w-lg mx-auto"
      >
        <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03]">
          <h2 className="font-serif text-lg text-[#1C1C1C] italic text-center mb-6">
            Informasi Acara
          </h2>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#C6A769] font-sans mb-1">
                Resepsi
              </p>
              <p className="text-[15px] text-[#1C1C1C] font-sans">
                {dateDisplay}
              </p>
              <p className="text-[13px] text-[#6B6B6B]/60 font-sans">
                {timeDisplay}
              </p>
            </div>

            <div className="w-12 h-px mx-auto bg-gradient-to-r from-transparent via-[#C6A769]/30 to-transparent" />

            <div className="text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#C6A769] font-sans mb-1">
                Lokasi
              </p>
              <p className="text-[15px] text-[#1C1C1C] font-sans">
                {locationDisplay}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Adab section — Syar'i template only */}
      {isSyari && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: slowEase }}
          className="py-12 px-6 max-w-lg mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03]">
            <h2 className="font-serif text-lg text-[#1C1C1C] italic text-center mb-6">
              Adab Menghadiri Acara
            </h2>
            <ul className="space-y-3 text-[14px] text-[#6B6B6B]/70 font-sans">
              <li className="flex items-start gap-3">
                <span className="text-[#C6A769] mt-0.5">1.</span>
                <span>Mendoakan kedua mempelai</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C6A769] mt-0.5">2.</span>
                <span>Menjaga adab selama acara</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C6A769] mt-0.5">3.</span>
                <span>Mengikuti pengaturan acara yang telah disediakan</span>
              </li>
            </ul>
          </div>
        </motion.section>
      )}

      {/* Personal Message */}
      {personalMessage && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isSyari ? 0.8 : 0.6, ease: slowEase }}
          className="py-8 px-6 max-w-lg mx-auto text-center"
        >
          <p className="font-serif text-[15px] text-[#1C1C1C]/70 italic leading-[1.7]">
            {personalMessage}
          </p>
        </motion.section>
      )}

      {/* RSVP: ONLY GUEST CAN SEE — Owner doesn't RSVP their own wedding */}
      {isGuest && guestName && (
        <RSVP slug={slug} guestName={guestName} isSyari={isSyari} />
      )}

      {/* 🔥 OWNER SECTION: Share + RSVP Dashboard */}
      {/* isGuest determined by URL ?to= param — the single source of truth */}
      {!isGuest && (
        <>
          <ShareButtons
            slug={slug}
            data={data}
            groomName={groomName}
            brideName={brideName}
            invitationMode={invitationMode}
            isSyari={isSyari}
          />
          <RSVPDashboard slug={slug} />
        </>
      )}

      {/* Closing */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: isSyari ? 1.1 : 0.9, ease: slowEase }}
        className="py-16 text-center px-6"
      >
        <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#C6A769]/30 to-transparent mb-6" />
        <p className="font-serif text-lg text-[#1C1C1C]/80 italic mb-2">
          Merupakan suatu kehormatan bagi kami
        </p>
        <p className="text-[13px] text-[#6B6B6B]/50 font-sans">
          apabila Anda berkenan hadir
        </p>

        <div className="mt-12">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#999]/30 font-sans">
            Powered by Nauka
          </p>
        </div>
      </motion.section>
    </main>
  );
}
