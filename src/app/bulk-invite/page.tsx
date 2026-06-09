'use client';

/**
 * NAUKA PRODUCTION: Bulk Invite Page
 *
 * 🔥 Supabase ONLY — no localStorage fallback
 * - Load invitations from Supabase
 * - Upload CSV → insert ke Supabase → generate links
 * - If Supabase not configured → show setup guide
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type InvitationData, type GuestLink } from '@/lib/invitation';
import { listInvitationsFromDB, isSupabaseConfigured } from '@/lib/db';
import { GuestUpload } from '@/components/GuestUpload';

const slowEase = [0.16, 1, 0.3, 1];

interface SavedInvitation {
  slug: string;
  data: InvitationData;
}

export default function BulkInvitePage() {
  const [invitations, setInvitations] = useState<SavedInvitation[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState<GuestLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  useEffect(() => {
    async function loadInvitations() {
      if (!configured) {
        setIsLoading(false);
        setDbError('Supabase belum dikonfigurasi');
        return;
      }

      try {
        const dbInvitations = await listInvitationsFromDB();

        if (dbInvitations.length > 0) {
          setInvitations(dbInvitations.map((inv) => ({
            slug: inv.slug,
            data: inv.data,
          })));
          setSelectedSlug(dbInvitations[0].slug);
        }
      } catch (err) {
        setDbError(err instanceof Error ? err.message : 'Gagal memuat data');
      }

      setIsLoading(false);
    }

    loadInvitations();
  }, [configured]);

  const selectedInvitation = invitations.find((inv) => inv.slug === selectedSlug);

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
            Memuat...
          </p>
        </motion.div>
      </main>
    );
  }

  // Supabase not configured — show setup guide
  if (!configured) {
    return (
      <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: slowEase }}
          className="text-center max-w-md"
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans mb-3">
            Bulk Invite
          </p>
          <h1 className="font-serif text-2xl text-[#1C1C1C] italic mb-3">
            ENV Supabase Tidak Terbaca
          </h1>
          <p className="text-[13px] text-[#6B6B6B]/60 mb-2">
            NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY tidak terbaca di frontend.
          </p>
          <p className="text-[12px] text-amber-600/70 mb-6">
            Set di Vercel → Settings → Environment Variables → Redeploy
          </p>

          <div className="bg-white rounded-2xl p-5 ring-1 ring-black/[0.03] text-left space-y-3">
            <p className="text-[12px] font-medium text-[#1C1C1C] font-sans">Setup Supabase:</p>
            <ol className="list-decimal list-inside space-y-2 text-[12px] text-[#6B6B6B]/70 font-sans">
              <li>Buat project di <a href="https://supabase.com" target="_blank" rel="noopener" className="text-[#C6A769] underline">supabase.com</a></li>
              <li>Buka Project Settings → API</li>
              <li>Copy Project URL dan anon/public key</li>
              <li>Tambahkan ke file <code className="bg-[#F6F2EE] px-1.5 rounded text-[10px]">.env</code></li>
            </ol>
            <div className="bg-[#F6F2EE] rounded-lg p-3 font-mono text-[10px] leading-relaxed text-[#6B6B6B]/60">
              NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
            </div>
            <p className="text-[10px] text-[#6B6B6B]/40 font-sans">
              Restart dev server setelah mengubah .env
            </p>
          </div>

          <div className="mt-6">
            <a
              href="/create"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#C6A769] font-sans hover:text-[#D4BA82] transition-colors duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
              Buat Undangan Dulu
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  // No invitations yet
  if (invitations.length === 0) {
    return (
      <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: slowEase }}
          className="text-center max-w-md"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans mb-4">
            Bulk Invite
          </p>
          <h1 className="font-serif text-2xl text-[#1C1C1C] italic mb-3">
            Belum Ada Undangan
          </h1>
          <p className="text-[13px] text-[#6B6B6B]/60 mb-6">
            Buat undangan terlebih dahulu, lalu kembali ke halaman ini untuk mengupload daftar tamu.
          </p>
          <a
            href="/create"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#C6A769] font-sans hover:text-[#D4BA82] transition-colors duration-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            Buat Undangan
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F2EE]">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: slowEase }}
        className="py-12 text-center px-6"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans mb-3">
          Bulk Invite
        </p>
        <h1 className="font-serif text-3xl text-[#1C1C1C] italic mb-2">
          Upload Daftar Tamu
        </h1>
        <p className="text-[13px] text-[#6B6B6B]/50 font-sans max-w-sm mx-auto">
          Upload file CSV atau TXT berisi nama tamu, lalu generate link undangan personal secara otomatis.
        </p>
        {/* Connection status */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-sans bg-green-50 text-green-500/70 border border-green-200/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Supabase Connected
          </span>
        </div>
      </motion.section>

      {/* Invitation Selector + Upload */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
        className="px-6 max-w-lg mx-auto pb-20"
      >
        <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03]">
          {/* Select invitation */}
          <div className="mb-6">
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2">
              Pilih Undangan
            </label>
            {invitations.length === 1 ? (
              <div className="px-4 py-2.5 rounded-xl bg-[#F6F2EE] text-[13px] text-[#1C1C1C] font-sans">
                {selectedInvitation?.data.groomName} &amp; {selectedInvitation?.data.brideName}
                <span className="text-[10px] text-[#6B6B6B]/30 ml-2">/{selectedSlug}</span>
              </div>
            ) : (
              <div className="space-y-2">
                {invitations.map((inv) => (
                  <button
                    key={inv.slug}
                    onClick={() => setSelectedSlug(inv.slug)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-[13px] font-sans transition-all duration-300 cursor-pointer ${
                      selectedSlug === inv.slug
                        ? 'bg-[#C6A769]/10 border border-[#C6A769]/20 text-[#1C1C1C]'
                        : 'bg-[#F6F2EE] border border-transparent text-[#6B6B6B]/60 hover:text-[#1C1C1C] hover:border-[#C6A769]/10'
                    }`}
                  >
                    <span className="font-serif italic">{inv.data.groomName} &amp; {inv.data.brideName}</span>
                    <span className="text-[10px] text-[#6B6B6B]/30 ml-2">/{inv.slug}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C6A769]/10 to-transparent mb-6" />

          {/* Upload section */}
          {selectedSlug && (
            <GuestUpload
              slug={selectedSlug}
              onGenerated={(links) => setGeneratedLinks(links)}
            />
          )}

          {/* Back to invitation */}
          {selectedSlug && (
            <div className="mt-6 text-center">
              <a
                href={`/i/${selectedSlug}`}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-[#C6A769]/50 hover:text-[#C6A769] font-sans transition-colors duration-300"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5m7-7-7 7 7 7" />
                </svg>
                Lihat Undangan
              </a>
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );
}
