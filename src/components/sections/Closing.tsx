'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // PRD: Emotional closing — subtle fade-in as you scroll to it
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const closingOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <section ref={sectionRef} className="nauka-light-warm nauka-vignette nauka-grain nauka-paper relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Cinematic closing ambience — warm glow that breathes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[50%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(198,167,105,0.06) 0%, transparent 60%)',
            animation: 'naukaBreathLight 8s ease-in-out infinite',
          }}
        />
      </div>
      {/* Secondary warm ambient from bottom */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-1/4 w-[40%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.03) 0%, transparent 50%)',
            animation: 'naukaBreathLight 10s ease-in-out 2s infinite',
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          style={{ opacity: closingOpacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: slowEase }}
        >
          {/* Brand marker — with subtle gold line animation */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: slowEase }}
              className="h-px w-10 bg-gradient-to-r from-transparent to-[#C6A769]/30 origin-right"
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A769] font-sans">Nauka</span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: slowEase }}
              className="h-px w-10 bg-gradient-to-l from-transparent to-[#C6A769]/30 origin-left"
            />
          </motion.div>

          {/* Closing statement — the emotional peak, like the final scene */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-[1.8rem] sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-[1.12] mb-6"
          >
            Hari Besarmu,
            <br />
            <span className="text-[#C6A769]">Layak Dirasakan Semua.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[15px] text-[#6B6B6B] leading-[1.7] max-w-md mx-auto mb-12"
          >
            Kami bantu buat undangan yang tamu-tamu mu benar-benar rasakan.
          </motion.p>

          {/* CTA — single, focused, like the final note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: cinematicEase }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href="#templates"
              className="group relative inline-flex items-center gap-2.5 px-12 py-4 rounded-full bg-[#C6A769] text-white text-[13px] font-medium tracking-[0.15em] uppercase hover:bg-[#D4BA82] transition-all duration-500 overflow-hidden"
            >
              {/* Warm glow behind button */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 30px rgba(198,167,105,0.3)' }}
              />
              <span className="relative z-10">Mulai Sekarang</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#ai-finder"
              className="text-[#6B6B6B] text-[11px] tracking-[0.2em] uppercase hover:text-[#C6A769] transition-colors duration-300"
            >
              Atau, kami bantu pilihkan
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer — minimal, warm, personal */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 mt-24 md:mt-32 pt-8 border-t border-black/[0.04]">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Image
            src="/logo-nauka.png"
            alt="Nauka"
            width={180}
            height={54}
            className="h-32 sm:h-36 w-auto"
          />

          {/* Tagline */}
          <p className="text-[13px] text-[#999] leading-[1.7] text-center max-w-xs">
            Studio undangan digital dengan perhatian pada suasana dan detail.
          </p>

          {/* Links — single row, minimal */}
          <div className="flex items-center gap-6">
            <a href="#templates" className="text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#C6A769] transition-colors duration-300">Template</a>
            <span className="w-1 h-1 rounded-full bg-[#C6A769]/20" />
            <a href="#why-nauka" className="text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#C6A769] transition-colors duration-300">Pendekatan</a>
            <span className="w-1 h-1 rounded-full bg-[#C6A769]/20" />
            <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#C6A769] transition-colors duration-300">Instagram</a>
            <span className="w-1 h-1 rounded-full bg-[#C6A769]/20" />
            <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#C6A769] transition-colors duration-300">WhatsApp</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 mt-8 border-t border-black/[0.03]">
          <p className="text-[11px] text-[#999] tracking-wider">
            &copy; 2026 Nauka Motion ~ small movement, real impact ~
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#C6A769] transition-colors duration-300">Privasi</a>
            <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#C6A769] transition-colors duration-300">Syarat</a>
          </div>
        </div>
      </div>
    </section>
  );
}
