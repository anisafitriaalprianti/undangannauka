'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <section id="templates" className="relative bg-[#050505] py-24 md:py-32">
      {/* Subtle top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-[#c9a96e]/20" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4 font-sans">
            Curated Collection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Hot Template
          </h2>
          <p className="text-[#8a8578] text-base max-w-md mx-auto leading-relaxed">
            Bukan marketplace. Setiap template dipilih dan dirancang dengan cinematic clarity.
          </p>
        </motion.div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group cursor-pointer"
            >
              {/* Card */}
              <div className="relative bg-[#0d0d0d] border border-white/[0.04] overflow-hidden hover:border-[#c9a96e]/15 transition-all duration-500">
                {/* Template Preview */}
                <div className="relative aspect-[9/14] overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/30 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#c9a96e]/40 text-[#c9a96e] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a96e]/10 transition-all">
                        Preview
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-semibold text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-300">
                      {template.name}
                    </h3>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 border border-[#c9a96e]/15 px-2 py-0.5">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5650] tracking-wider uppercase">{template.vibes}</p>
                </div>
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
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#8a8578] text-sm tracking-wider hover:text-[#c9a96e] transition-colors duration-300"
          >
            Lihat Semua Template
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
