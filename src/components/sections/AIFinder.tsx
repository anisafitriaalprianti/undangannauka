'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const tones = ['Islam', 'Umum'];
const cultures = ['Jawa', 'Sunda', 'Batak', 'Modern'];
const vibes = ['Elegant', 'Modern', 'Vintage', 'Cinematic', 'Cute', 'Luxury'];

export default function AIFinder() {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<string | null>(null);
  const [selectedVibes, setSelectedVibes] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFind = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedTone(null);
    setSelectedCulture(null);
    setSelectedVibes(null);
    setShowResult(false);
  };

  return (
    <section id="ai-finder" className="relative bg-[#080808] py-24 md:py-32">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a96e]/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4 font-sans">
            Guided Recommendation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Belum Punya Konsep?
          </h2>
          <p className="text-[#8a8578] text-base max-w-md mx-auto leading-relaxed">
            Kami bantu pilihkan template yang paling cocok dengan kebutuhanmu.
          </p>
        </motion.div>

        {/* Finder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#0d0d0d] border border-white/[0.04] p-6 sm:p-10"
        >
          {!showResult ? (
            <div className="space-y-8">
              {/* Step 1: Religious Tone */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#8a8578] mb-3">
                  01 — Nuansa Agama
                </label>
                <div className="flex flex-wrap gap-3">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-5 py-2.5 text-sm tracking-wider border transition-all duration-300 ${
                        selectedTone === tone
                          ? 'border-[#c9a96e]/40 text-[#c9a96e] bg-[#c9a96e]/[0.06]'
                          : 'border-white/[0.06] text-[#5a5650] hover:border-white/[0.12] hover:text-[#8a8578]'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Cultural Theme */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#8a8578] mb-3">
                  02 — Tema Budaya
                </label>
                <div className="flex flex-wrap gap-3">
                  {cultures.map((culture) => (
                    <button
                      key={culture}
                      onClick={() => setSelectedCulture(culture)}
                      className={`px-5 py-2.5 text-sm tracking-wider border transition-all duration-300 ${
                        selectedCulture === culture
                          ? 'border-[#c9a96e]/40 text-[#c9a96e] bg-[#c9a96e]/[0.06]'
                          : 'border-white/[0.06] text-[#5a5650] hover:border-white/[0.12] hover:text-[#8a8578]'
                      }`}
                    >
                      {culture}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Vibes */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#8a8578] mb-3">
                  03 — Suasana
                </label>
                <div className="flex flex-wrap gap-3">
                  {vibes.map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => setSelectedVibes(vibe)}
                      className={`px-5 py-2.5 text-sm tracking-wider border transition-all duration-300 ${
                        selectedVibes === vibe
                          ? 'border-[#c9a96e]/40 text-[#c9a96e] bg-[#c9a96e]/[0.06]'
                          : 'border-white/[0.06] text-[#5a5650] hover:border-white/[0.12] hover:text-[#8a8578]'
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </div>

              {/* Find Button */}
              <button
                onClick={handleFind}
                disabled={!selectedTone && !selectedCulture && !selectedVibes}
                className="w-full py-3.5 bg-[#c9a96e] text-[#050505] text-sm font-medium tracking-[0.2em] uppercase hover:bg-[#e0c992] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#c9a96e]"
              >
                Temukan Template
              </button>
            </div>
          ) : (
            /* Result State - Teaser */
            <div className="text-center py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#c9a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-[#f5f0e8] mb-3">
                  Kami Punya Rekomendasi
                </h3>
                <p className="text-[#8a8578] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  Berdasarkan pilihanmu, kami sudah menemukan template yang paling cocok. Segera hadir di Phase 3.
                </p>
                <button
                  onClick={handleReset}
                  className="text-[#c9a96e] text-sm tracking-wider hover:text-[#e0c992] transition-colors duration-300"
                >
                  Pilih Ulang
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
