'use client';

import { motion } from 'framer-motion';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const steps = [
  {
    number: '01',
    title: 'Pilih',
    hint: 'Temukan template yang cocok dengan suasana hari istimewamu.',
  },
  {
    number: '02',
    title: 'Isi',
    hint: 'Masukkan detail acara dan cerita kalian — sisanya kami yang urus.',
  },
  {
    number: '03',
    title: 'Upload',
    hint: 'Tambahkan foto dan momen yang ingin kamu bagikan.',
  },
  {
    number: '04',
    title: 'Kirim',
    hint: 'Preview, pastikan sempurna, lalu bagikan ke orang-orang tercinta.',
  },
];

export default function Process() {
  return (
    <section id="process" className="nauka-atmosphere nauka-grain nauka-paper relative py-16 sm:py-20 bg-[#F6F2EE] overflow-hidden">
      {/* Top blend — smooth transition from white section above */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header — not "Simple & Clear", more like a quiet promise */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Tidak Rumit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
          >
            Empat Langkah,
            <br />
            <span className="text-[#C6A769]">Satu Kesempurnaan.</span>
          </motion.h2>
        </div>

        {/* Steps — a vertical flow with breathing space, not a grid with connectors */}
        <div className="max-w-lg mx-auto space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: slowEase }}
              className="group relative"
            >
              <div className="flex items-start gap-6 py-6">
                {/* Number — minimal, elegant */}
                <div className="flex-shrink-0 pt-1">
                  <span className="font-mono text-[13px] tracking-[0.2em] text-[#C6A769]/30 group-hover:text-[#C6A769]/60 transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-2 group-hover:text-[#C6A769] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#6B6B6B] leading-[1.7]">
                    {step.hint}
                  </p>
                </div>
              </div>

              {/* Divider — subtle gold line, not a connector arrow */}
              {index < steps.length - 1 && (
                <div className="ml-[1.85rem] pl-0 border-l border-[#C6A769]/8 h-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
