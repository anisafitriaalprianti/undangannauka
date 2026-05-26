'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const features = [
  { label: 'Artistic Direction', detail: 'Setiap frame disutradarai, bukan di-template' },
  { label: 'Handcrafted Storytelling', detail: 'Cerita yang dirangkai dengan emosi' },
  { label: 'Emotional Cinematic Experience', detail: 'Bukan slideshow, tapi pengalaman' },
  { label: 'Opening Signature Nauka', detail: 'Identitas yang membuat undanganmu berbeda' },
];

export default function SignatureShowcase() {
  return (
    <section id="signature" className="nauka-atmosphere-luxury relative py-28 md:py-36 overflow-hidden">
      {/* Warm transition from manifesto */}
      <div className="nauka-transition-warm" />

      {/* Section divider */}
      <div className="nauka-divider-warm" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: slowEase }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-6 font-sans">
              Highest Tier
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-7 leading-[1.1]">
              Signature
              <br />
              <span className="text-[#c9a96e]">Experience</span>
            </h2>
            <p className="text-[#8a8578] text-[15px] leading-[1.7] mb-10 max-w-md mx-auto lg:mx-0">
              Signature bukan sekadar mahal. Signature adalah pengalaman emosional yang disutradarai. Semua elemen sinkron, motion punya makna, font punya direction, properti punya alasan.
            </p>

            {/* Signature Features */}
            <div className="space-y-5 mb-12">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: cinematicEase }}
                  className="group flex items-start gap-4 justify-center lg:justify-start"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c9a96e]/25 group-hover:bg-[#c9a96e]/50 transition-colors duration-500 flex-shrink-0" />
                  <div>
                    <span className="text-[14px] text-[#f5f0e8]/80 group-hover:text-[#c9a96e] transition-colors duration-500">{feature.label}</span>
                    <span className="text-[12px] text-[#5a5650] ml-2 hidden sm:inline">{feature.detail}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="#"
              className="group inline-flex items-center gap-3 px-9 py-4 border border-[#c9a96e]/20 text-[#c9a96e]/80 text-[12px] tracking-[0.2em] uppercase hover:border-[#c9a96e]/35 hover:text-[#c9a96e] hover:bg-[#c9a96e]/[0.03] transition-all duration-500"
            >
              Coming Soon
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c9a96e]/30 group-hover:bg-[#c9a96e]/60 transition-colors duration-500" />
            </a>
          </motion.div>

          {/* Signature Template Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.15, ease: slowEase }}
            className="flex-1 flex justify-center"
          >
            <div className="relative group">
              {/* Dramatic glow — richer in luxury section */}
              <div className="absolute -inset-16 bg-gradient-to-b from-[#c9a96e]/[0.04] via-[#c9a96e]/[0.02] to-transparent rounded-full blur-[80px] group-hover:from-[#c9a96e]/[0.06] transition-all duration-1000" />

              <div className="relative w-[250px] sm:w-[275px] md:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-[#c9a96e]/8 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/15 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent z-10" />
                <Image
                  src="/template-signature.png"
                  alt="Nauka Signature Template"
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                  sizes="300px"
                />
              </div>

              <div className="absolute -top-3 -right-3 bg-[#c9a96e] text-[#050505] text-[8px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 shadow-[0_4px_12px_rgba(201,169,110,0.2)]">
                Signature
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
