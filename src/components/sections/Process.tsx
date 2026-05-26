'use client';

import { motion } from 'framer-motion';

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
    <section id="process" className="relative bg-[#050505] py-24 md:py-32">
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
            Simple & Clear
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Caranya Mudah
          </h2>
          <p className="text-[#8a8578] text-base max-w-md mx-auto leading-relaxed">
            Kamu tidak menjadi designer. Kamu hanya memilih, mengisi, dan kami yang menjaga harmony.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative text-center"
            >
              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+30px)] w-[calc(100%-60px)] h-[1px] bg-white/[0.04]" />
              )}

              {/* Step number */}
              <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a96e]/15 mb-5">
                <span className="font-mono text-sm text-[#c9a96e]/60 tracking-wider">{step.number}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-semibold text-[#f5f0e8] mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#8a8578] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
