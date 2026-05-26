'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const templates = [
  {
    id: 1,
    name: 'Eternal Bloom',
    vibes: 'Elegant',
    image: '/template-premium-1.png',
    note: 'Untuk yang menghargai kelembutan',
  },
  {
    id: 2,
    name: 'Silent Vow',
    vibes: 'Modern',
    image: '/template-premium-2.png',
    note: 'Ketika kesederhanaan berbicara lebih keras',
  },
  {
    id: 3,
    name: 'Timeless Grace',
    vibes: 'Vintage',
    image: '/template-premium-3.png',
    note: 'Bagi yang percaya pada keabadian',
  },
];

export default function HotTemplate() {
  return (
    <section id="templates" className="relative bg-[#050505] py-28 md:py-36">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-5 font-sans"
          >
            Curated Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-5"
          >
            Hot Template
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[#8a8578] text-[15px] max-w-md mx-auto leading-[1.7]"
          >
            Bukan marketplace. Setiap template dipilih dan dirancang dengan cinematic clarity.
          </motion.p>
        </div>

        {/* Desktop: Curated Gallery Layout — center card elevated */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8 items-end">
          {templates.map((template, index) => {
            const isFeatured = index === 1;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, delay: index * 0.15, ease: slowEase }}
                className="group cursor-pointer"
              >
                {/* The template display — no card bg, just the work */}
                <div className={`relative ${isFeatured ? '-mt-6' : 'mt-6'}`}>
                  {/* Atmospheric glow for featured */}
                  {isFeatured && (
                    <div className="absolute -inset-10 bg-[#c9a96e]/[0.025] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  )}

                  {/* Template image frame */}
                  <div
                    className={`relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ${
                      isFeatured
                        ? 'aspect-[9/14] group-hover:-translate-y-2'
                        : 'aspect-[9/14] group-hover:-translate-y-1.5'
                    }`}
                  >
                    {/* Subtle frame border — like a gallery piece */}
                    <div className="absolute inset-0 border border-white/[0.04] z-10 pointer-events-none" />

                    {/* Skeleton */}
                    <div className="absolute inset-0 bg-[#0d0d0d] animate-pulse" />
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Bottom gold accent — always visible, animates on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent group-hover:via-[#c9a96e]/50 transition-all duration-700 z-10" />

                    {/* Top shimmer on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                    {/* Hover overlay — cinematic, not harsh */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-[#050505]/0 to-[#050505]/0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end justify-center pb-8">
                      <span className="inline-flex items-center gap-2 px-7 py-3 border border-[#c9a96e]/25 text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm bg-[#050505]/30 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        Preview
                      </span>
                    </div>
                  </div>

                  {/* Template info — editorial, not card-footer */}
                  <div className="mt-5 px-1">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-500">
                        {template.name}
                      </h3>
                      <span className="w-1 h-1 rounded-full bg-[#c9a96e]/30 flex-shrink-0" />
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/30">{template.vibes}</span>
                    </div>
                    <p className="text-[12px] text-[#5a5650] italic leading-[1.5]">
                      {template.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet: Horizontal scroll — gallery swipe feel */}
        <div className="lg:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: slowEase }}
              className="flex-shrink-0 w-[78vw] max-w-[320px] snap-center group cursor-pointer"
            >
              {/* Template image */}
              <div className="relative aspect-[9/14] overflow-hidden">
                <div className="absolute inset-0 border border-white/[0.04] z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[#0d0d0d] animate-pulse" />
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  sizes="78vw"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center pb-7">
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#c9a96e]/25 text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm bg-[#050505]/30">
                    Preview
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 px-0.5">
                <div className="flex items-baseline gap-2.5 mb-1">
                  <h3 className="font-serif text-lg font-semibold text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-500">
                    {template.name}
                  </h3>
                  <span className="w-1 h-1 rounded-full bg-[#c9a96e]/30" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/30">{template.vibes}</span>
                </div>
                <p className="text-[12px] text-[#5a5650] italic leading-[1.5]">{template.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-14 md:mt-16"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-[#5a5650] text-[12px] tracking-[0.2em] uppercase hover:text-[#c9a96e] transition-colors duration-500"
          >
            Lihat Semua Template
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
