'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const templates = [
  {
    id: 1,
    name: 'Eternal Bloom',
    category: 'Premium',
    vibes: 'Elegant',
    image: '/template-premium-1.png',
  },
  {
    id: 2,
    name: 'Silent Vow',
    category: 'Premium',
    vibes: 'Modern',
    image: '/template-premium-2.png',
  },
  {
    id: 3,
    name: 'Timeless Grace',
    category: 'Premium',
    vibes: 'Vintage',
    image: '/template-premium-3.png',
  },
];

export default function HotTemplate() {
  return (
    <section id="templates" className="relative bg-[#050505] py-28 md:py-36">
      {/* Section divider — subtle, centered */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header — staggered reveal */}
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

        {/* Template Cards — staggered with depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: slowEase,
              }}
              className="group cursor-pointer"
            >
              {/* Card — depth on hover */}
              <div className="relative bg-[#0a0a0a] border border-white/[0.03] overflow-hidden transition-all duration-700 group-hover:border-[#c9a96e]/12 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] group-hover:-translate-y-1">
                {/* Template Preview */}
                <div className="relative aspect-[9/14] overflow-hidden">
                  {/* Skeleton placeholder */}
                  <div className="absolute inset-0 bg-[#0d0d0d] animate-pulse" />
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Top shimmer line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {/* Hover overlay — subtle, not harsh */}
                  <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/40 transition-all duration-700 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                      <span className="inline-flex items-center gap-2 px-7 py-3 border border-[#c9a96e]/30 text-[#c9a96e] text-[11px] tracking-[0.25em] uppercase backdrop-blur-sm bg-[#050505]/20">
                        Preview
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-serif text-lg font-semibold text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-500">
                      {template.name}
                    </h3>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/50 border border-[#c9a96e]/10 px-2.5 py-1 group-hover:border-[#c9a96e]/20 group-hover:text-[#c9a96e]/70 transition-all duration-500">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5a5650] tracking-[0.15em] uppercase">{template.vibes}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA — subtle, not screaming */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-[#5a5650] text-[13px] tracking-[0.2em] uppercase hover:text-[#c9a96e] transition-colors duration-500"
          >
            Lihat Semua Template
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
