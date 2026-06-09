'use client';

/**
 * NAUKA PRODUCTION: ShareButtons — Owner only
 *
 * 🔥 Owner-only component — shown only when !isGuest
 * - Copy personalized link
 * - WhatsApp share
 * - GuestUpload (CSV → Supabase → links)
 *
 * ⚠️ STRICT RULES:
 * - This component must ONLY be rendered in /i/[slug]/page.tsx
 * - Guest = NO SHARE COMPONENT AT ALL (parent controls visibility)
 * - No hide logic inside this component — the parent decides
 * - Only 1 instance of ShareButtons in the entire app
 */

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateShareText, buildInvitationLink, type InvitationData } from '@/lib/invitation';
import { GuestUpload } from '@/components/GuestUpload';

interface ShareButtonsProps {
  slug: string;
  data: InvitationData | null;
  groomName: string;
  brideName: string;
  invitationMode: string;
  isSyari: boolean;
}

export function ShareButtons({
  slug,
  data,
  groomName,
  brideName,
  invitationMode,
  isSyari,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState('');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const shareUrl = useMemo(() => {
    return buildInvitationLink(baseUrl, slug, guestNameInput || undefined);
  }, [baseUrl, slug, guestNameInput]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [shareUrl]);

  const shareWhatsApp = useCallback(() => {
    const shareData: InvitationData = {
      groomName,
      brideName,
      date: data?.date || '',
      time: data?.time || '',
      location: data?.location || '',
      personalMessage: data?.personalMessage || '',
      template: data?.template || slug,
      mode: invitationMode as InvitationData['mode'],
      createdAt: data?.createdAt || '',
    };
    const text = generateShareText(shareData, shareUrl);
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [shareUrl, groomName, brideName, data, slug, invitationMode]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: isSyari ? 0.9 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-10 px-6 max-w-lg mx-auto"
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-black/[0.03] text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans mb-4">
          Bagikan Undangan
        </p>
        <p className="text-[13px] text-[#6B6B6B]/50 font-sans mb-5">
          Kirim undangan ini kepada tamu Anda
        </p>

        {/* Guest name input for personalized link */}
        <div className="mb-5">
          <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2 text-left">
            Nama Tamu (opsional)
          </label>
          <input
            type="text"
            value={guestNameInput}
            onChange={(e) => setGuestNameInput(e.target.value)}
            placeholder="Contoh: Andi"
            className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EE] border border-black/[0.04] text-[13px] text-[#1C1C1C] placeholder-[#6B6B6B]/30 focus:outline-none focus:ring-1 focus:ring-[#C6A769]/30 transition-all duration-300 font-sans"
          />
          {guestNameInput && (
            <p className="text-[10px] text-[#C6A769]/70 font-sans mt-2 text-left break-all">
              Link: {shareUrl}
            </p>
          )}
        </div>

        <div className="flex gap-3 max-w-xs mx-auto">
          {/* Copy Link */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyLink}
            className={`flex-1 py-3 rounded-full text-center text-[11px] tracking-[0.15em] uppercase font-sans transition-all duration-500 cursor-pointer ${
              copied
                ? 'bg-[#C6A769] text-white'
                : 'bg-[#F6F2EE] border border-[#C6A769]/20 text-[#C6A769] hover:bg-[#C6A769]/5'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {copied ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
              {copied ? 'Tersalin' : 'Salin Link'}
            </span>
          </motion.button>

          {/* WhatsApp */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={shareWhatsApp}
            className="flex-1 py-3 rounded-full text-center text-[11px] tracking-[0.15em] uppercase font-sans bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/15 transition-all duration-500 cursor-pointer"
          >
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </span>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C6A769]/10 to-transparent my-5" />

        {/* Batch Upload — CSV/TXT → Supabase → personalized links */}
        <GuestUpload slug={slug} />
      </div>
    </motion.section>
  );
}
