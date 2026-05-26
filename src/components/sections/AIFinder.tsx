'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

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
    setShowResult(false);
    setTimeout(() => {
      setSelectedTone(null);
      setSelectedCulture(null);
      setSelectedVibes(null);
    }, 300);
  };

  const selectionCount = [selectedTone, selectedCulture, selectedVibes].filter(Boolean).length;

  return (
    <section id="ai-finder" className="relative bg-[#070707] py-28 md:py-36">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a96e]/[0.012] rounded-full blur-[120px]" />
      </div>

      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-5 font-sans"
          >
            Guided Recommendation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-5"
          >
            Belum Punya Konsep?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[#8a8578] text-[15px] max-w-md mx-auto leading-[1.7]"
          >
            Kami bantu pilihkan template yang paling cocok dengan kebutuhanmu.
          </motion.p>
        </div>

        {/* Finder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: slowEase }}
          className="bg-[#0a0a0a] border border-white/[0.03] p-7 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="finder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-9"
              >
                {/* Step 1 */}
                <div>
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#8a8578] mb-4">
                    <span className="font-mono text-[#c9a96e]/30">01</span>
                    Nuansa Agama
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(selectedTone === tone ? null : tone)}
                        className={`px-6 py-3 text-[13px] tracking-[0.1em] border transition-all duration-400 ${
                          selectedTone === tone
                            ? 'border-[#c9a96e]/30 text-[#c9a96e] bg-[#c9a96e]/[0.05] shadow-[0_0_20px_rgba(201,169,110,0.05)]'
                            : 'border-white/[0.05] text-[#5a5650] hover:border-white/[0.1] hover:text-[#8a8578]'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#8a8578] mb-4">
                    <span className="font-mono text-[#c9a96e]/30">02</span>
                    Tema Budaya
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {cultures.map((culture) => (
                      <button
                        key={culture}
                        onClick={() => setSelectedCulture(selectedCulture === culture ? null : culture)}
                        className={`px-6 py-3 text-[13px] tracking-[0.1em] border transition-all duration-400 ${
                          selectedCulture === culture
                            ? 'border-[#c9a96e]/30 text-[#c9a96e] bg-[#c9a96e]/[0.05] shadow-[0_0_20px_rgba(201,169,110,0.05)]'
                            : 'border-white/[0.05] text-[#5a5650] hover:border-white/[0.1] hover:text-[#8a8578]'
                        }`}
                      >
                        {culture}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#8a8578] mb-4">
                    <span className="font-mono text-[#c9a96e]/30">03</span>
                    Suasana
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {vibes.map((vibe) => (
                      <button
                        key={vibe}
                        onClick={() => setSelectedVibes(selectedVibes === vibe ? null : vibe)}
                        className={`px-6 py-3 text-[13px] tracking-[0.1em] border transition-all duration-400 ${
                          selectedVibes === vibe
                            ? 'border-[#c9a96e]/30 text-[#c9a96e] bg-[#c9a96e]/[0.05] shadow-[0_0_20px_rgba(201,169,110,0.05)]'
                            : 'border-white/[0.05] text-[#5a5650] hover:border-white/[0.1] hover:text-[#8a8578]'
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
                  disabled={selectionCount === 0}
                  className="w-full py-4 bg-[#c9a96e] text-[#050505] text-[12px] font-medium tracking-[0.25em] uppercase hover:bg-[#e0c992] transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#c9a96e]"
                >
                  Temukan Template
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: slowEase }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 mx-auto mb-7 rounded-full bg-[#c9a96e]/[0.06] border border-[#c9a96e]/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#c9a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-[#f5f0e8] mb-3">
                  Kami Punya Rekomendasi
                </h3>
                <p className="text-[#8a8578] text-[14px] leading-[1.7] mb-10 max-w-sm mx-auto">
                  Berdasarkan pilihanmu, kami sudah menemukan template yang paling cocok. Fitur ini segera hadir di Phase 3.
                </p>
                <button
                  onClick={handleReset}
                  className="text-[#c9a96e]/70 text-[12px] tracking-[0.2em] uppercase hover:text-[#c9a96e] transition-colors duration-400"
                >
                  Pilih Ulang
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
