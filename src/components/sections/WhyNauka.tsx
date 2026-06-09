'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

/* PRD: Why Nauka is a "section rasa", not "section penjelasan".
   3 principles, 1 short line each, more whitespace.
   Visual speaks. Words are whispers, not lectures. */

const principles = [
  { word: 'Tepat', hint: 'Setiap detail punya alasan' },
  { word: 'Berniat', hint: 'Setiap gerak punya tujuan' },
  { word: 'Terasa', hint: 'Setiap suasana meninggalkan jejak' },
];

export default function WhyNauka() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const statementY = useTransform(scrollYProgress, [0.5, 1], [30, -20]);

  return (
    <section ref={sectionRef} id="why-nauka" className="nauka-grain nauka-ink relative py-32 sm:py-44 bg-[#F6F2EE] overflow-hidden">
      {/* Top blend — smooth transition from white section above */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }}
      />

      <div className="nauka-frame-line hidden lg:block" />
      <div className="nauka-frame-line-right hidden lg:block" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* The manifesto — huge breathing space, let it land */}
        <motion.div
          style={{ y: statementY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: slowEase }}
          className="text-center mb-28 sm:mb-40"
        >
          {/* Warm spotlight on the quote */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.04) 0%, transparent 60%)',
              animation: 'naukaBreathLight 8s ease-in-out infinite',
            }}
          />

          <div className="relative inline-block">
            <p className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1C1C]/60 italic leading-[1.25] max-w-2xl mx-auto">
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
            className="mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#C6A769]/25 to-transparent"
          />
        </motion.div>

        {/* Three principles — single word + one short line. More whitespace. Less noise. */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-24">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: slowEase }}
              className="group text-center"
            >
              {/* The word — just the word, bigger now, bolder in its simplicity */}
              <p className="font-serif text-2xl sm:text-3xl text-[#1C1C1C]/30 italic group-hover:text-[#1C1C1C]/70 transition-colors duration-700 mb-4">
                {principle.word}
              </p>
              {/* One short line — poetic, not explanatory */}
              <p className="text-[13px] text-[#6B6B6B]/40 group-hover:text-[#6B6B6B]/70 transition-colors duration-700 leading-[1.6] max-w-[180px]">
                {principle.hint}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
