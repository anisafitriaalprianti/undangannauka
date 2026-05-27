'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const slowEase = [0.16, 1, 0.3, 1];

const tones = ['Islam', 'Umum'];
const cultures = ['Jawa', 'Sunda', 'Batak', 'Modern'];
const vibes = ['Elegant', 'Modern', 'Vintage', 'Cinematic', 'Cute', 'Luxury'];

export default function AIFinder() {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<string | null>(null);
  const [selectedVibes, setSelectedVibes] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFind = () => setShowResult(true);

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
    <section id="ai-finder" className="relative py-16 sm:py-20 bg-white">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header — smaller, helper feel */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: slowEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Guided Recommendation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-2"
          >
            Belum Punya Konsep?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[14px] text-[#6B6B6B]"
          >
            Kami bantu pilihkan yang paling cocok.
          </motion.p>
        </div>

        {/* Finder Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: slowEase }}
          className="bg-[#F6F2EE] rounded-2xl p-6 sm:p-8 ring-1 ring-black/5"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="finder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-7"
              >
                {/* Step 1 */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">
                    <span className="font-mono text-[#C6A769]/40">01</span>
                    Nuansa Agama
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(selectedTone === tone ? null : tone)}
                        className={`px-5 py-2 rounded-full text-[13px] transition-all duration-300 ${
                          selectedTone === tone
                            ? 'bg-[#C6A769] text-white shadow-[0_2px_12px_rgba(198,167,105,0.2)]'
                            : 'bg-white text-[#6B6B6B] ring-1 ring-black/5 hover:ring-[#C6A769]/20 hover:text-[#1C1C1C]'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">
                    <span className="font-mono text-[#C6A769]/40">02</span>
                    Tema Budaya
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cultures.map((culture) => (
                      <button
                        key={culture}
                        onClick={() => setSelectedCulture(selectedCulture === culture ? null : culture)}
                        className={`px-5 py-2 rounded-full text-[13px] transition-all duration-300 ${
                          selectedCulture === culture
                            ? 'bg-[#C6A769] text-white shadow-[0_2px_12px_rgba(198,167,105,0.2)]'
                            : 'bg-white text-[#6B6B6B] ring-1 ring-black/5 hover:ring-[#C6A769]/20 hover:text-[#1C1C1C]'
                        }`}
                      >
                        {culture}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">
                    <span className="font-mono text-[#C6A769]/40">03</span>
                    Suasana
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {vibes.map((vibe) => (
                      <button
                        key={vibe}
                        onClick={() => setSelectedVibes(selectedVibes === vibe ? null : vibe)}
                        className={`px-5 py-2 rounded-full text-[13px] transition-all duration-300 ${
                          selectedVibes === vibe
                            ? 'bg-[#C6A769] text-white shadow-[0_2px_12px_rgba(198,167,105,0.2)]'
                            : 'bg-white text-[#6B6B6B] ring-1 ring-black/5 hover:ring-[#C6A769]/20 hover:text-[#1C1C1C]'
                        }`}
                      >
                        {vibe}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Find Button — pill */}
                <button
                  onClick={handleFind}
                  disabled={selectionCount === 0}
                  className="w-full py-3.5 rounded-full bg-[#C6A769] text-white text-[12px] font-medium tracking-[0.2em] uppercase hover:bg-[#D4BA82] transition-all duration-400 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#C6A769]"
                >
                  Temukan Template
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: slowEase }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C6A769]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#1C1C1C] mb-2">
                  Kami Punya Rekomendasi
                </h3>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.7] mb-8 max-w-sm mx-auto">
                  Berdasarkan pilihanmu, kami sudah menemukan template yang paling cocok. Fitur ini segera hadir.
                </p>
                <button
                  onClick={handleReset}
                  className="text-[#C6A769]/70 text-[11px] tracking-[0.2em] uppercase hover:text-[#C6A769] transition-colors duration-300"
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
