'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

export default function SignatureShowcase() {
  return (
    <section id="signature" className="relative bg-[#050505] py-28 md:py-36 overflow-hidden">
      {/* Dramatic lighting — felt, not random */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-[#c9a96e]/[0.015] rounded-full blur-[180px]" />
        <div className="absolute bottom-[-5%] left-[15%] w-[400px] h-[400px] bg-[#2a1f0f]/[0.06] rounded-full blur-[120px]" />
      </div>

      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

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
            <p className="text-[#8a8578] text-[15px] leading-[1.7] mb-8 max-w-md mx-auto lg:mx-0">
              Signature bukan sekadar mahal. Signature adalah pengalaman emosional yang disutradarai. Semua elemen sinkron, motion punya makna, font punya direction, properti punya alasan.
            </p>

            {/* Signature Features — staggered reveal */}
            <div className="space-y-4 mb-10">
              {['Artistic Direction', 'Handcrafted Storytelling', 'Emotional Cinematic Experience', 'Opening Signature Nauka'].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: cinematicEase }}
                  className="flex items-center gap-4 justify-center lg:justify-start"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]/30" />
                  <span className="text-[14px] text-[#8a8578]">{feature}</span>
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

          {/* Signature Template Preview — cinematic depth */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.15, ease: slowEase }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Dramatic glow behind — intentional, warm */}
              <div className="absolute -inset-16 bg-gradient-to-b from-[#c9a96e]/[0.03] via-[#c9a96e]/[0.015] to-transparent rounded-full blur-[80px]" />

              {/* Main mockup */}
              <div className="relative w-[250px] sm:w-[275px] md:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-[#c9a96e]/8 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] group">
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/15 to-transparent z-10" />
                <Image
                  src="/template-signature.png"
                  alt="Nauka Signature Template"
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                  sizes="300px"
                />
              </div>

              {/* Signature badge — positioned, not floating randomly */}
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
