'use client';

import { motion } from 'framer-motion';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const steps = [
  {
    number: '01',
    title: 'Pilih Template',
    description: 'Pilih dari koleksi curated kami. Bisa pakai AI Finder kalau bingung.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Isi Data',
    description: 'Masukkan nama, tanggal, lokasi, dan detail acaramu. Kami yang jaga design.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Upload Media',
    description: 'Upload foto dan media yang ingin ditampilkan. Kami yang atur layout.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Preview & Checkout',
    description: 'Lihat hasil preview langsung. Kalau sudah pas, checkout dan publish.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
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

        {/* Steps — narrative timeline */}
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
                <div className="hidden lg:block absolute top-9 left-[calc(50%+36px)] w-[calc(100%-72px)] h-[1px]">
                  <div className="w-full h-full bg-gradient-to-r from-white/[0.04] to-white/[0.02]" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/[0.08]" />
                </div>
              )}

              {/* Step number + icon container */}
              <div className="inline-flex items-center justify-center w-[72px] h-[72px] border border-[#c9a96e]/10 mb-6 group-hover:border-[#c9a96e]/20 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(201,169,110,0.04)] relative">
                <span className="font-mono text-[13px] text-[#c9a96e]/40 tracking-[0.15em] group-hover:text-[#c9a96e]/60 transition-colors duration-500">{step.number}</span>
                {/* Icon — appears on hover, subtle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-[#c9a96e]/30">
                    {step.icon}
                  </div>
                </div>
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
