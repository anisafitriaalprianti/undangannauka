'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SignatureShowcase() {
  return (
    <section id="signature" className="relative bg-[#050505] py-24 md:py-32 overflow-hidden">
      {/* Dramatic background lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#c9a96e]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[#2a1f0f]/[0.08] rounded-full blur-[120px]" />
      </div>

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-[#c9a96e]/20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4 font-sans">
              Highest Tier
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-6">
              Signature
              <br />
              <span className="text-[#c9a96e]">Experience</span>
            </h2>
            <p className="text-[#8a8578] text-base leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              Signature bukan sekadar mahal. Signature adalah pengalaman emosional yang disutradarai. Semua elemen sinkron, motion punya makna, font punya direction, properti punya alasan.
            </p>

            {/* Signature Features */}
            <div className="space-y-3 mb-8">
              {['Artistic Direction', 'Handcrafted Storytelling', 'Emotional Cinematic Experience', 'Opening Signature Nauka'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-1 h-1 rounded-full bg-[#c9a96e]/50" />
                  <span className="text-sm text-[#8a8578]">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-[#c9a96e]/30 text-[#c9a96e] text-sm tracking-[0.2em] uppercase hover:bg-[#c9a96e]/[0.06] transition-all duration-300"
            >
              COMING SOON
            </a>
          </motion.div>

          {/* Signature Template Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Glow behind the mockup */}
              <div className="absolute -inset-8 bg-gradient-to-b from-[#c9a96e]/[0.04] to-transparent rounded-full blur-[60px]" />

              {/* Main mockup */}
              <div className="relative w-[260px] sm:w-[280px] md:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-[#c9a96e]/10 shadow-2xl shadow-black/60">
                <Image
                  src="/template-signature.png"
                  alt="Nauka Signature Template"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>

              {/* Signature badge */}
              <div className="absolute -top-3 -right-3 bg-[#c9a96e] text-[#050505] text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5">
                Signature
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
