'use client';

import { motion } from 'framer-motion';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    text: 'Undangannya keren bikin dimana?',
    type: 'Reaction',
  },
  {
    text: 'Uh so sweet banget cerita cinta kalian.',
    type: 'Emotional',
  },
  {
    text: 'Baru kali ini liat undangan begini.',
    type: 'Impression',
  },
  {
    text: 'Tamunya pada kejut semua, nggak nyangka undangan digital bisa sekeren ini.',
    type: 'Reaction',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-[#070707] py-28 md:py-36">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-18">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-5 font-sans"
          >
            Real Reactions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-5"
          >
            Kata Mereka
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[#8a8578] text-[15px] max-w-md mx-auto leading-[1.7]"
          >
            Bukan testimoni biasa. Ini reaksi emosional asli dari orang yang menerima undangan Nauka.
          </motion.p>
        </div>

        {/* Testimonial Cards — depth and breathing room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: slowEase,
              }}
              className="group relative bg-[#0a0a0a] border border-white/[0.03] p-7 sm:p-9 hover:border-[#c9a96e]/8 transition-all duration-700"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-4 left-6 text-[#c9a96e]/[0.06] font-serif text-4xl leading-none select-none">&ldquo;</span>

              {/* Quote */}
              <p className="font-serif text-lg sm:text-xl text-[#f5f0e8]/85 italic leading-[1.6] mb-6 relative z-10">
                {testimonial.text}
              </p>

              {/* Type tag */}
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]/30 group-hover:bg-[#c9a96e]/50 transition-colors duration-500" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#5a5650] group-hover:text-[#8a8578] transition-colors duration-500">
                  {testimonial.type}
                </span>
              </div>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#c9a96e]/30 to-transparent group-hover:w-full transition-all duration-[800ms]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
