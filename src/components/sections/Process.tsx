'use client';

import { motion } from 'framer-motion';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const steps = [
  {
    number: '01',
    title: 'Pilih Template',
    description: 'Pilih dari koleksi curated kami. Bisa pakai AI Finder kalau bingung.',
  },
  {
    number: '02',
    title: 'Isi Data',
    description: 'Masukkan nama, tanggal, lokasi, dan detail acaramu. Kami yang jaga design.',
  },
  {
    number: '03',
    title: 'Upload Media',
    description: 'Upload foto dan media yang ingin ditampilkan. Kami yang atur layout.',
  },
  {
    number: '04',
    title: 'Preview & Checkout',
    description: 'Lihat hasil preview langsung. Kalau sudah pas, checkout dan publish.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-[#050505] py-28 md:py-36">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-5 font-sans"
          >
            Simple & Clear
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-5"
          >
            Caranya Mudah
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[#8a8578] text-[15px] max-w-md mx-auto leading-[1.7]"
          >
            Kamu tidak menjadi designer. Kamu hanya memilih, mengisi, dan kami yang menjaga harmony.
          </motion.p>
        </div>

        {/* Steps — clean flow with connectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: slowEase,
              }}
              className="relative text-center group"
            >
              {/* Connector line between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+36px)] w-[calc(100%-72px)] h-[1px]">
                  <div className="w-full h-full bg-gradient-to-r from-white/[0.04] to-white/[0.02]" />
                  {/* Arrow dot at end */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/[0.08]" />
                </div>
              )}

              {/* Step number — geometric, not decorative */}
              <div className="inline-flex items-center justify-center w-[72px] h-[72px] border border-[#c9a96e]/10 mb-6 group-hover:border-[#c9a96e]/20 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(201,169,110,0.04)]">
                <span className="font-mono text-[13px] text-[#c9a96e]/40 tracking-[0.15em] group-hover:text-[#c9a96e]/60 transition-colors duration-500">{step.number}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-semibold text-[#f5f0e8] mb-3 group-hover:text-[#c9a96e] transition-colors duration-500">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-[#8a8578] leading-[1.7] max-w-[240px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
