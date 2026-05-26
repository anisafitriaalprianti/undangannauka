'use client';

import { motion } from 'framer-motion';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

export default function Closing() {
  return (
    <section className="relative bg-[#050505] py-28 md:py-36 overflow-hidden">
      {/* Warm glow — emotional, not cold */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c9a96e]/[0.02] rounded-full blur-[140px]" />
      </div>

      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: slowEase }}
        >
          {/* Brand marker — refined */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#c9a96e]/20" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] font-sans">
              Nauka
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#c9a96e]/20" />
          </motion.div>

          {/* Closing statement — the final emotional beat */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: slowEase }}
            className="font-serif text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f0e8] leading-[1.12] mb-8"
          >
            Bukan Sekadar Undangan.
            <br />
            <span className="text-[#c9a96e]">Sebuah Pengalaman.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#8a8578] text-[15px] sm:text-lg leading-[1.7] max-w-lg mx-auto mb-14"
          >
            Undangan digital dengan rasa yang lebih hidup. Crafted dengan cinematic clarity, meaningful motion, dan emotional storytelling.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: cinematicEase }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#templates"
              className="group relative inline-flex items-center gap-3 px-11 py-4 bg-[#c9a96e] text-[#050505] text-[12px] font-medium tracking-[0.2em] uppercase hover:bg-[#e0c992] transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Mulai Sekarang</span>
              <svg
                className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </a>
            <a
              href="#ai-finder"
              className="inline-flex items-center gap-2 px-11 py-4 border border-white/[0.06] text-[#8a8578] text-[12px] tracking-[0.2em] uppercase hover:border-[#c9a96e]/15 hover:text-[#c9a96e] transition-all duration-500"
            >
              Bantuan Pilih
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 mt-24 md:mt-32 pt-8 border-t border-white/[0.03]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8a7444] flex items-center justify-center">
              <span className="text-[#050505] font-serif font-bold text-[8px]">N</span>
            </div>
            <span className="font-serif text-sm tracking-[0.15em] text-[#5a5650]">
              NAUKA
            </span>
          </div>
          <p className="text-[11px] text-[#3a3835] tracking-wider">
            &copy; 2026 Nauka Studio. Crafted with feel, taste, and soul.
          </p>
        </div>
      </div>
    </section>
  );
}
