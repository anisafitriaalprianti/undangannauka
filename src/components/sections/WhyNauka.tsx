'use client';

import { motion } from 'framer-motion';

const slowEase = [0.16, 1, 0.3, 1];

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
  return (
    <section id="why-nauka" className="relative py-16 sm:py-20 bg-[#F6F2EE]">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header — minimal */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: slowEase }}
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

        {/* Principles — clean grid, short & powerful */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: slowEase }}
              className="group relative bg-white rounded-2xl p-8 sm:p-10 ring-1 ring-black/5 hover:ring-[#C6A769]/15 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(198,167,105,0.08)]"
            >
              {/* Number */}
              <span className="block font-mono text-[11px] tracking-[0.3em] text-[#C6A769]/30 mb-6 group-hover:text-[#C6A769]/50 transition-colors duration-500">
                {principle.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-[1.65rem] font-semibold text-[#1C1C1C] mb-3 group-hover:text-[#C6A769] transition-colors duration-500">
                {principle.title}
              </h3>

              {/* Single line — no long descriptions */}
              <p className="text-[15px] text-[#6B6B6B] leading-[1.6]">
                {principle.line}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-[#C6A769]/0 via-[#C6A769]/0 to-[#C6A769]/0 group-hover:via-[#C6A769]/25 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Single statement — breathing space */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.3, ease: slowEase }}
          className="mt-20 sm:mt-28 text-center"
        >
          <div className="inline-block">
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
