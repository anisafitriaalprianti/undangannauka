'use client';

import { motion } from 'framer-motion';

export default function Closing() {
  return (
    <section className="relative bg-[#050505] py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#c9a96e]/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-[#c9a96e]/20" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Closing message */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-6 font-sans">
            Nauka
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f0e8] leading-[1.15] mb-8">
            Bukan Sekadar Undangan.
            <br />
            <span className="text-[#c9a96e]">Sebuah Pengalaman.</span>
          </h2>

          <p className="text-[#8a8578] text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-12">
            Undangan digital dengan rasa yang lebih hidup. Crafted dengan cinematic clarity, meaningful motion, dan emotional storytelling.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#templates"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#c9a96e] text-[#050505] text-sm font-medium tracking-[0.2em] uppercase hover:bg-[#e0c992] transition-all duration-300"
            >
              MULAI SEKARANG
            </a>
            <a
              href="#ai-finder"
              className="inline-flex items-center gap-2 px-10 py-4 border border-white/[0.08] text-[#8a8578] text-sm tracking-[0.2em] uppercase hover:border-[#c9a96e]/20 hover:text-[#c9a96e] transition-all duration-300"
            >
              BANTUAN PILIH
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 mt-20 md:mt-28 pt-8 border-t border-white/[0.04]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8a7444] flex items-center justify-center">
              <span className="text-[#050505] font-serif font-bold text-[8px]">N</span>
            </div>
            <span className="font-serif text-sm tracking-wider text-[#5a5650]">
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
