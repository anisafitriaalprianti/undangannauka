'use client';

import { motion } from 'framer-motion';

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
    <section id="testimonials" className="relative bg-[#080808] py-24 md:py-32">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-[#c9a96e]/20" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4 font-sans">
            Real Reactions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Kata Mereka
          </h2>
          <p className="text-[#8a8578] text-base max-w-md mx-auto leading-relaxed">
            Bukan testimoni biasa. Ini reaksi emosional asli dari orang yang menerima undangan Nauka.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative bg-[#0d0d0d] border border-white/[0.03] p-6 sm:p-8 hover:border-[#c9a96e]/8 transition-all duration-500"
            >
              {/* Quote */}
              <p className="font-serif text-lg sm:text-xl text-[#f5f0e8]/90 italic leading-relaxed mb-5">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Type tag */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]/40" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#5a5650]">
                  {testimonial.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
