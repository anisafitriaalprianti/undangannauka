'use client';

import { motion } from 'framer-motion';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

export default function Closing() {
  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: slowEase }}
        >
          {/* Brand marker */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C6A769]/25" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A769] font-sans">
              Nauka
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C6A769]/25" />
          </motion.div>

          {/* Closing statement */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-[1.8rem] sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-[1.12] mb-6"
          >
            Bukan Sekadar Undangan.
            <br />
            <span className="text-[#C6A769]">Sebuah Pengalaman.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[15px] text-[#6B6B6B] leading-[1.7] max-w-md mx-auto mb-10"
          >
            Undangan digital dengan rasa yang lebih hidup.
          </motion.p>

          {/* CTA — pill buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: cinematicEase }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#templates"
              className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#C6A769] text-white text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-[#D4BA82] transition-all duration-400 overflow-hidden"
            >
              <span className="relative z-10">Mulai Sekarang</span>
              <svg
                className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#ai-finder"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-[#1C1C1C]/8 text-[#6B6B6B] text-[12px] tracking-[0.15em] uppercase hover:border-[#C6A769]/25 hover:text-[#C6A769] transition-all duration-400"
            >
              Bantuan Pilih
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-20 md:mt-28 pt-6 border-t border-black/[0.04]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C6A769] to-[#8A7444] flex items-center justify-center">
              <span className="text-white font-serif font-bold text-[8px]">N</span>
            </div>
            <span className="font-serif text-sm tracking-[0.15em] text-[#999]">
              NAUKA
            </span>
          </div>
          <p className="text-[11px] text-[#999] tracking-wider">
            &copy; 2026 Nauka Studio. Crafted with feel, taste, and soul.
          </p>
        </div>
      </div>
    </section>
  );
}
