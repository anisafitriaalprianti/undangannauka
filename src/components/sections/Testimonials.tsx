'use client';

import { motion } from 'framer-motion';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    text: 'Undangannya keren bikin dimana?',
    type: 'Reaction',
    featured: false,
  },
  {
    text: 'Uh so sweet banget cerita cinta kalian.',
    type: 'Emotional',
    featured: false,
  },
  {
    text: 'Baru kali ini liat undangan begini.',
    type: 'Impression',
    featured: false,
  },
  {
    text: 'Tamunya pada kejut semua, nggak nyangka undangan digital bisa sekeren ini.',
    type: 'Reaction',
    featured: true,
  },
];

export default function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const others = testimonials.filter((t) => !t.featured);

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

        {/* Featured Testimonial — dramatic, full-width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: slowEase }}
          className="group relative bg-[#080808] border border-white/[0.04] p-10 sm:p-14 mb-5 md:mb-6 hover:border-[#c9a96e]/8 transition-all duration-700 overflow-hidden"
        >
          {/* Atmospheric glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#c9a96e]/[0.012] rounded-full blur-[100px] pointer-events-none" />

          {/* Decorative quote — large, atmospheric */}
          <span className="absolute top-5 left-8 text-[#c9a96e]/[0.05] font-serif text-7xl leading-none select-none">&ldquo;</span>

          {/* The quote itself */}
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#f5f0e8]/90 italic leading-[1.5] mb-8 relative z-10 max-w-3xl">
            {featured.text}
          </p>

          {/* Type indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]/40 group-hover:bg-[#c9a96e]/60 transition-colors duration-500" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#5a5650] group-hover:text-[#8a8578] transition-colors duration-500">
              {featured.type}
            </span>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#c9a96e]/30 to-transparent group-hover:w-full transition-all duration-[1000ms]" />
        </motion.div>

        {/* Other Testimonials — flowing, not grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((testimonial, index) => (
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
              className="group relative bg-[#0a0a0a] border border-white/[0.03] p-7 sm:p-8 hover:border-[#c9a96e]/8 transition-all duration-700"
            >
              {/* Quote mark */}
              <span className="absolute top-3 left-5 text-[#c9a96e]/[0.05] font-serif text-3xl leading-none select-none">&ldquo;</span>

              {/* Quote */}
              <p className="font-serif text-lg text-[#f5f0e8]/80 italic leading-[1.6] mb-5 relative z-10">
                {testimonial.text}
              </p>

              {/* Type tag */}
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-[#c9a96e]/25 group-hover:bg-[#c9a96e]/50 transition-colors duration-500" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#5a5650] group-hover:text-[#8a8578] transition-colors duration-500">
                  {testimonial.type}
                </span>
              </div>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#c9a96e]/20 to-transparent group-hover:w-full transition-all duration-[800ms]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
