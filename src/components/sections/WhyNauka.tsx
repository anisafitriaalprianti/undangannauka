'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const principles = [
  {
    number: '01',
    title: 'Susunan yang Tepat',
    line: 'Setiap elemen ditempatkan dengan pertimbangan. Tipografi, jarak, dan warna — bukan kebetulan, tapi pilihan.',
  },
  {
    number: '02',
    title: 'Gerakan yang Berniat',
    line: 'Animasi yang hadir untuk mendukung suasana, bukan mengejutkan. Setiap transisi punya alasan.',
  },
  {
    number: '03',
    title: 'Suasana yang Terasa',
    line: 'Undangan yang menghadirkan suasana, bukan sekadar informasi. Tamu merasakan sebelum membaca.',
  },
];

export default function WhyNauka() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // PRD: Cinematic scroll — subtle parallax on statement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const statementY = useTransform(scrollYProgress, [0.5, 1], [30, -20]);

  return (
    <section ref={sectionRef} id="why-nauka" className="nauka-light-warm nauka-grain relative py-16 sm:py-20 bg-[#F6F2EE] overflow-hidden">
      {/* PRD: Editorial motif — frame lines for cinematic depth */}
      <div className="nauka-frame-line hidden lg:block" />
      <div className="nauka-frame-line-right hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* The manifesto — this is the star, not an afterthought */}
        <motion.div
          style={{ y: statementY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: slowEase }}
          className="text-center mb-16 sm:mb-24"
        >
          {/* PRD: Lighting felt — subtle warm spotlight on the quote */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.04) 0%, transparent 60%)',
              animation: 'naukaBreathLight 8s ease-in-out infinite',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-6 font-sans"
          >
            Cara Kami Berpikir
          </motion.p>

          <div className="relative inline-block">
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1C1C]/80 italic leading-[1.3] max-w-2xl mx-auto">
              Undangan yang <span className="text-[#C6A769] not-italic font-semibold">dirasakan</span>,
              <br />
              bukan sekadar dibaca.
            </p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: slowEase }}
            className="mt-8 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#C6A769]/30 to-transparent"
          />
        </motion.div>

        {/* Principles — quiet, confident, like beliefs not features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: slowEase }}
              className="group relative bg-white rounded-2xl p-8 sm:p-10 ring-1 ring-black/5 hover:ring-[#C6A769]/15 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(198,167,105,0.08)] overflow-hidden"
            >
              {/* PRD: Lighting must be felt — subtle directional highlight on hover */}
              <div className="absolute top-0 left-0 w-[50%] h-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.06) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Number — like a chapter marker */}
              <span className="block font-mono text-[11px] tracking-[0.3em] text-[#C6A769]/30 mb-6 group-hover:text-[#C6A769]/50 transition-colors duration-500">
                {principle.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-[1.65rem] font-semibold text-[#1C1C1C] mb-3 group-hover:text-[#C6A769] transition-colors duration-500">
                {principle.title}
              </h3>

              {/* Description — give it depth, not just one line */}
              <p className="text-[14px] text-[#6B6B6B] leading-[1.7]">
                {principle.line}
              </p>

              {/* Bottom accent on hover — subtle reveal */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C6A769]/25 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
