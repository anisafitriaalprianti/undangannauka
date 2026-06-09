'use client';

/**
 * NAUKA PRODUCTION: Create Invitation Page
 *
 * 🔥 Save to Supabase (primary) + localStorage (fallback)
 * After creation, redirect to invitation view page.
 */

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/lib/mode';
import { generateSlug, saveInvitation, type InvitationData } from '@/lib/invitation';
import { saveInvitationToDB, isSupabaseConfigured } from '@/lib/db';

const slowEase = [0.16, 1, 0.3, 1];

function CreateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mode } = useMode();
  const templateSlug = searchParams.get('template') || 'basic-calm';

  // Form state
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  // Validation
  const isFormValid = groomName.trim() !== '' && brideName.trim() !== '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateInvitation = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    const slug = generateSlug(groomName, brideName);

    // Determine mode: from context, or infer from template
    const invitationMode = mode || (templateSlug.includes('syari') ? 'syari' : 'universal');

    const invitationData: InvitationData = {
      groomName: groomName.trim(),
      brideName: brideName.trim(),
      date,
      time,
      location,
      personalMessage,
      template: templateSlug,
      mode: invitationMode,
      createdAt: new Date().toISOString(),
    };

    // 1. Save ke localStorage (instant fallback)
    saveInvitation(slug, invitationData);

    // 2. Save ke Supabase (fire-and-forget)
    const result = await saveInvitationToDB(slug, invitationData);
console.log('SUPABASE RESULT:', result);

    // Navigate ke halaman undangan
    router.push(`/i/${slug}`);
  };

  return (
    <main className="min-h-screen bg-[#F6F2EE] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: slowEase }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C6A769]/30" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A769] font-sans">
              Buat Undangan
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C6A769]/30" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C] leading-[1.15] mb-3">
            Isi Data{' '}
            <span className="text-[#C6A769]">Undangan</span>
          </h1>

          <p className="text-[14px] text-[#6B6B6B]/60 max-w-md mx-auto leading-[1.7]">
            Lengkapi informasi di bawah untuk membuat undanganmu.
          </p>

          {/* Template indicator */}
          <div className="mt-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans bg-white border border-[#C6A769]/20 text-[#C6A769]/70">
              Template: {templateSlug}
            </span>
          </div>

          {/* DB status */}
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-sans ${
              isSupabaseConfigured()
                ? 'bg-green-50 text-green-500/70 border border-green-200/30'
                : 'bg-amber-50 text-amber-500/70 border border-amber-200/30'
            }`}>
              {isSupabaseConfigured() ? 'Supabase Connected' : 'Local Mode (no Supabase)'}
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
          className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03] nauka-shadow-premium"
        >
          {/* Mempelai */}
          <div className="mb-8">
            <h2 className="font-serif text-lg text-[#1C1C1C] italic mb-4">Mempelai</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
                  Nama Mempelai 1 *
                </label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="Arka"
                  className="w-full px-4 py-3 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[14px] text-[#1C1C1C] placeholder-[#6B6B6B]/30 focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
                  Nama Mempelai 2 *
                </label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Dyana"
                  className="w-full px-4 py-3 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[14px] text-[#1C1C1C] placeholder-[#6B6B6B]/30 focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans"
                />
              </div>
            </div>
            {/* Validation hint */}
            {!isFormValid && (groomName || brideName) && (
              <p className="text-[11px] text-[#C6A769]/70 font-sans mt-2">
                Nama mempelai wajib diisi untuk membuat undangan.
              </p>
            )}
          </div>

          {/* Acara */}
          <div className="mb-8">
            <h2 className="font-serif text-lg text-[#1C1C1C] italic mb-4">Acara</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[14px] text-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
                  Waktu
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[14px] text-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Graha Sabha, Jakarta Selatan"
                  className="w-full px-4 py-3 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[14px] text-[#1C1C1C] placeholder-[#6B6B6B]/30 focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Pesan Personal */}
          <div className="mb-8">
            <h2 className="font-serif text-lg text-[#1C1C1C] italic mb-4">Pesan Personal</h2>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
                Pesan untuk Tamu (opsional)
              </label>
              <textarea
                rows={3}
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                placeholder="Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir..."
                className="w-full px-4 py-3 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[14px] text-[#1C1C1C] placeholder-[#6B6B6B]/30 focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={isFormValid && !isSubmitting ? { scale: 1.01 } : {}}
            whileTap={isFormValid && !isSubmitting ? { scale: 0.99 } : {}}
            onClick={handleCreateInvitation}
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 rounded-full text-center text-[12px] tracking-[0.2em] uppercase font-sans transition-all duration-500 cursor-pointer ${
              isSubmitting
                ? 'bg-[#C6A769]/60 text-white/70 cursor-wait'
                : isFormValid
                  ? 'bg-[#C6A769] text-white hover:bg-[#D4BA82]'
                  : 'bg-[#C6A769]/30 text-white/50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Menyimpan...' : 'Buat Undangan'}
          </motion.button>

          {/* Preview slug */}
          {isFormValid && (
            <p className="text-[10px] text-[#6B6B6B]/40 font-sans text-center mt-3">
              Link undangan: /i/{generateSlug(groomName, brideName)}
            </p>
          )}
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="/templates"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#999]/50 font-sans hover:text-[#C6A769]/60 transition-colors duration-300"
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
            Kembali ke Katalog
          </a>
        </motion.div>
      </div>
    </main>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center">
        <div className="text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]/40 font-sans">
          Memuat...
        </div>
      </main>
    }>
      <CreateContent />
    </Suspense>
  );
}
