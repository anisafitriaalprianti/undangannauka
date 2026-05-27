'use client';

import { motion } from 'framer-motion';

const slowEase = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    text: 'Undangannya keren bikin dimana?',
    name: 'Rina S.',
    type: 'Reaction',
  },
  {
    text: 'Uh so sweet banget cerita cinta kalian.',
    name: 'Dewi A.',
    type: 'Emotional',
  },
  {
    text: 'Baru kali ini liat undangan begini.',
    name: 'Budi P.',
    type: 'Impression',
  },
  {
    text: 'Tamunya pada kejut semua, nggak nyangka undangan digital bisa sekeren ini.',
    name: 'Anisa M.',
    type: 'Reaction',
    featured: true,
  },
];

export default function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const others = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 bg-white">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: slowEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Real Reactions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
          >
            Kata Mereka
          </motion.h2>
        </div>

        {/* Featured Testimonial — elevated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: slowEase }}
          className="group relative bg-[#1C1C1C] rounded-2xl p-8 sm:p-10 md:-translate-y-3 shadow-xl mb-5"
        >
          <span className="absolute top-4 left-6 text-white/[0.05] font-serif text-6xl leading-none select-none">
            &ldquo;
          </span>

          <p className="font-serif text-xl sm:text-2xl text-white/90 italic leading-[1.5] mb-6 relative z-10 max-w-3xl">
            {featured.text}
          </p>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6A769]/20 flex items-center justify-center text-[10px] font-semibold text-[#C6A769]">
              {featured.name.charAt(0)}
            </div>
            <div>
              <span className="text-[13px] text-white/80 font-medium">{featured.name}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1 h-1 rounded-full bg-[#C6A769]/50" />
                <span className="text-[9px] tracking-[0.15em] uppercase text-white/30">
                  {featured.type}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Testimonials — 3 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: slowEase }}
              className="group relative bg-[#F6F2EE] rounded-2xl p-6 sm:p-8 ring-1 ring-black/5 hover:ring-[#C6A769]/15 transition-all duration-500"
            >
              <span className="absolute top-3 left-4 text-[#C6A769]/[0.08] font-serif text-3xl leading-none select-none">
                &ldquo;
              </span>

              <p className="font-serif text-lg text-[#1C1C1C]/80 italic leading-[1.6] mb-5 relative z-10">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#C6A769]/10 flex items-center justify-center text-[8px] font-semibold text-[#C6A769]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[12px] text-[#1C1C1C]/70">{testimonial.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-0.5 h-0.5 rounded-full bg-[#C6A769]/30" />
                    <span className="text-[8px] tracking-[0.15em] uppercase text-[#999]">
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
