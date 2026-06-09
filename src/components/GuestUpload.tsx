'use client';

/**
 * NAUKA PRODUCTION: GuestUpload — Upload CSV/TXT → Supabase → generate & export links
 *
 * 🔥 Supabase ONLY — no localStorage, no fallback
 * Flow:
 * 1. Check Supabase configured → if not, show setup guide
 * 2. Upload file CSV/TXT
 * 3. Parse nama tamu
 * 4. Insert langsung ke Supabase table "guests"
 * 5. Generate link undangan personal dari data hasil insert
 * 6. Export: copy semua / download CSV
 *
 * ⚠️ ONLY rendered by ShareButtons (owner only)
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseGuestFile, generateGuestLinks, type GuestLink } from '@/lib/invitation';
import { saveGuestsToDB, isSupabaseConfigured } from '@/lib/db';

interface GuestUploadProps {
  slug: string;
  onGenerated?: (links: GuestLink[]) => void;
}

export function GuestUpload({ slug, onGenerated }: GuestUploadProps) {
  const [links, setLinks] = useState<GuestLink[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isCopyingAll, setIsCopyingAll] = useState(false);
  const [allCopied, setAllCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const configured = isSupabaseConfigured();

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear previous state
    setIsProcessing(true);
    setFileName(file.name);
    setAllCopied(false);
    setError(null);

    try {
      // 1. Parse file → guest names
      const names = await parseGuestFile(file);

      if (names.length === 0) {
        setError('File tidak berisi nama tamu yang valid');
        return;
      }

      // 2. Insert langsung ke Supabase — throws if not configured
      const inserted = await saveGuestsToDB(slug, names);

      // 3. Generate links from inserted data
      const baseUrl = window.location.origin;
      const result = generateGuestLinks({
        baseUrl,
        slug,
        guestList: inserted.map((g) => g.name),
      });

      setLinks(result);
      onGenerated?.(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses file';
      setError(message);

      // If Supabase not configured, show setup guide
      if (message.includes('ENV Supabase tidak terbaca') || message.includes('Supabase belum dikonfigurasi')) {
        setShowSetupGuide(true);
      }

      setLinks([]);
    } finally {
      setIsProcessing(false);
    }
  }, [slug, onGenerated]);

  const copySingleLink = useCallback(async (link: string, index: number) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const copyAllLinks = useCallback(async () => {
    setIsCopyingAll(true);
    try {
      const text = links.map((l) => `${l.name}: ${l.link}`).join('\n');
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2500);
    } catch {
      // silent fail
    } finally {
      setIsCopyingAll(false);
    }
  }, [links]);

  const downloadCSV = useCallback(() => {
    const csv = 'name,link\n' + links.map((l) => `${l.name},${l.link}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guest-links-${slug}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [links, slug]);

  const reset = useCallback(() => {
    setLinks([]);
    setFileName('');
    setAllCopied(false);
    setError(null);
    setShowSetupGuide(false);
    onGenerated?.([]);
  }, [onGenerated]);

  return (
    <div className="space-y-4">
      {/* 🔥 SUPABASE NOT CONFIGURED — Show setup guide */}
      {!configured && (
        <div className="rounded-xl bg-amber-50 border border-amber-200/40 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-[12px] text-amber-800 font-sans font-medium">
                Supabase belum dikonfigurasi
              </p>
              <p className="text-[11px] text-amber-700/60 font-sans mt-1">
                ENV Supabase tidak terbaca di frontend
              </p>
              <p className="text-[10px] text-amber-700/40 font-sans mt-1">
                Set NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY di Vercel → Settings → Environment Variables → Redeploy
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSetupGuide(!showSetupGuide)}
            className="text-[10px] tracking-[0.1em] uppercase text-amber-600/70 hover:text-amber-600 font-sans transition-colors cursor-pointer"
          >
            {showSetupGuide ? 'Tutup panduan' : 'Lihat panduan setup'}
          </button>

          <AnimatePresence>
            {showSetupGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white/80 rounded-lg p-3 space-y-2 text-[11px] text-amber-800/80 font-sans">
                  <p className="font-medium">Langkah setup Supabase:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Buat project di <a href="https://supabase.com" target="_blank" rel="noopener" className="text-amber-600 underline">supabase.com</a></li>
                    <li>Buka Project Settings → API</li>
                    <li>Copy URL dan anon/public key</li>
                    <li>Tambahkan ke file <code className="bg-amber-50 px-1 rounded text-[10px]">.env</code>:</li>
                  </ol>
                  <div className="bg-amber-50/50 rounded-lg p-2 font-mono text-[10px] leading-relaxed text-amber-900/70">
                    NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co<br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
                  </div>
                  <p className="text-[10px] text-amber-700/50 mt-1">
                    Restart dev server setelah mengubah .env
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Area */}
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B]/60 font-sans mb-2 text-left">
          Upload Daftar Tamu (CSV / TXT)
        </label>

        <label className={`group relative flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-all duration-300 cursor-pointer ${
          configured
            ? 'bg-[#F6F2EE] border border-dashed border-[#C6A769]/20 hover:border-[#C6A769]/40'
            : 'bg-[#F6F2EE]/50 border border-dashed border-[#6B6B6B]/10 cursor-not-allowed'
        }`}>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            disabled={!configured}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <svg className={`w-4 h-4 transition-colors ${
            configured ? 'text-[#C6A769]/40 group-hover:text-[#C6A769]/70' : 'text-[#6B6B6B]/20'
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 16V4m0 0L8 8m4-4 4 4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" />
          </svg>
          <span className={`text-[12px] font-sans transition-colors ${
            configured ? 'text-[#6B6B6B]/40 group-hover:text-[#6B6B6B]/60' : 'text-[#6B6B6B]/20'
          }`}>
            {!configured
              ? 'ENV Supabase tidak terbaca'
              : isProcessing
                ? 'Memproses & menyimpan ke Supabase...'
                : fileName || 'Pilih file CSV atau TXT'}
          </span>
        </label>
      </div>

      {/* Processing indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-[11px] text-[#C6A769]/60 font-sans"
          >
            <div className="w-3 h-3 border border-[#C6A769]/20 border-t-[#C6A769] rounded-full animate-spin" />
            Membaca file & menyimpan ke Supabase...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && !showSetupGuide && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-400/70 font-sans px-1"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {/* Header with count */}
            <p className="text-[11px] tracking-[0.1em] uppercase text-[#C6A769] font-sans">
              {links.length} Tamu tersimpan di Supabase
            </p>

            {/* Guest link list */}
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {links.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-[#F6F2EE]/60 group hover:bg-[#F6F2EE] transition-colors"
                >
                  <span className="text-[10px] text-[#C6A769]/50 font-sans w-5 text-right shrink-0">
                    {i + 1}.
                  </span>
                  <span className="text-[12px] text-[#1C1C1C] font-sans truncate min-w-0 shrink-0 max-w-[80px]">
                    {l.name}
                  </span>
                  <span className="text-[10px] text-[#6B6B6B]/20 font-sans">→</span>
                  <span className="text-[10px] text-[#6B6B6B]/40 font-sans truncate min-w-0 flex-1">
                    {l.link}
                  </span>
                  <button
                    onClick={() => copySingleLink(l.link, i)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {copiedIndex === i ? (
                      <svg className="w-3.5 h-3.5 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-[#6B6B6B]/30 hover:text-[#C6A769]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Export Actions */}
            <div className="flex gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyAllLinks}
                disabled={isCopyingAll}
                className={`flex-1 py-2.5 rounded-full text-center text-[11px] tracking-[0.15em] uppercase font-sans transition-all duration-500 cursor-pointer ${
                  allCopied
                    ? 'bg-[#C6A769] text-white'
                    : 'bg-[#F6F2EE] border border-[#C6A769]/20 text-[#C6A769] hover:bg-[#C6A769]/5'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {isCopyingAll ? (
                    <div className="w-3.5 h-3.5 border border-[#C6A769]/20 border-t-[#C6A769] rounded-full animate-spin" />
                  ) : allCopied ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  {isCopyingAll ? 'Menyalin...' : allCopied ? 'Tersalin!' : 'Salin Semua'}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadCSV}
                className="flex-1 py-2.5 rounded-full text-center text-[11px] tracking-[0.15em] uppercase font-sans bg-[#F6F2EE] border border-[#C6A769]/20 text-[#C6A769] hover:bg-[#C6A769]/5 transition-all duration-500 cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4v12m0 0-4-4m4 4 4-4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" />
                  </svg>
                  Download CSV
                </span>
              </motion.button>
            </div>

            {/* Reset */}
            <div className="text-center pt-1">
              <button
                onClick={reset}
                className="text-[10px] tracking-[0.1em] uppercase text-[#6B6B6B]/30 hover:text-[#6B6B6B]/60 font-sans transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
