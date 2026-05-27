'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const principles = [
  {
    number: '01',
    title: 'Cinematic Clarity',
    line: 'Pacing, atmosphere, dan hierarchy yang tepat.',
  },
  {
    number: '02',
    title: 'Meaningful Motion',
    line: 'Setiap gerakan punya alasan, bukan dekorasi.',
  },
  {
    number: '03',
    title: 'Emotional Feel',
    line: 'Dirasakan, bukan sekadar dilihat.',
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
    <section ref={sectionRef} id="why-nauka" className="nauka-light-warm relative py-16 sm:py-20 bg-[#F6F2EE] overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Our Belief
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
          >
            Kenapa Nauka?
          </motion.h2>
        </div>

        {/* Principles — clean grid with cinematic stagger */}
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

              {/* Number */}
              <span className="block font-mono text-[11px] tracking-[0.3em] text-[#C6A769]/30 mb-6 group-hover:text-[#C6A769]/50 transition-colors duration-500">
                {principle.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-[1.65rem] font-semibold text-[#1C1C1C] mb-3 group-hover:text-[#C6A769] transition-colors duration-500">
                {principle.title}
              </h3>

              {/* Single line */}
              <p className="text-[15px] text-[#6B6B6B] leading-[1.6]">
                {principle.line}
              </p>

              {/* Bottom accent on hover — PRD: proper pacing, subtle reveal */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C6A769]/25 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Single statement — cinematic breathing space */}
        <motion.div
          style={{ y: statementY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.3, ease: slowEase }}
          className="mt-20 sm:mt-28 text-center relative"
        >
          {/* PRD: Lighting felt — subtle warm spotlight on the quote */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.04) 0%, transparent 60%)',
              animation: 'naukaBreathLight 8s ease-in-out infinite',
            }}
          />

          <div className="relative inline-block">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C6A769]/30 to-transparent mx-auto mb-8" />
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1C1C]/80 italic leading-[1.4] max-w-xl mx-auto">
              Undangan harus <span className="text-[#C6A769] not-italic font-semibold">dirasakan</span>,
              <br />
              bukan sekadar dibaca.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
