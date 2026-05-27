'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const principles = [
  {
    mark: '~',
    word: 'Susunan yang Tepat',
  },
  {
    mark: '~',
    word: 'Gerakan yang Berniat',
  },
  {
    mark: '~',
    word: 'Suasana yang Terasa',
  },
];

export default function WhyNauka() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const statementY = useTransform(scrollYProgress, [0.5, 1], [30, -20]);

  return (
    <section ref={sectionRef} id="why-nauka" className="nauka-light-warm nauka-grain nauka-ink relative py-24 sm:py-32 bg-[#F6F2EE] overflow-hidden">
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
          className="text-center mb-20 sm:mb-28"
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
            <p className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1C1C]/70 italic leading-[1.25] max-w-2xl mx-auto">
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

        {/* Three words — not cards, not explanations. Just beliefs hanging in space */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: slowEase }}
              className="group text-center"
            >
              {/* Tiny tilde mark — like a handwritten accent */}
              <span className="block text-[#C6A769]/25 text-sm mb-3 group-hover:text-[#C6A769]/50 transition-colors duration-500">
                {principle.mark}
              </span>
              {/* The word — just the word, nothing else */}
              <p className="font-serif text-lg sm:text-xl text-[#1C1C1C]/50 italic group-hover:text-[#1C1C1C]/80 group-hover:text-[#C6A769] transition-colors duration-500">
                {principle.word}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
