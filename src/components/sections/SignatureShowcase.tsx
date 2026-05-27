'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const slowEase = [0.16, 1, 0.3, 1];

const features = [
  'Artistic Direction',
  'Handcrafted Storytelling',
  'Emotional Cinematic Experience',
  'Opening Signature Nauka',
];

export default function SignatureShowcase() {
  return (
    <section id="signature" className="relative py-16 sm:py-20 bg-[#F6F2EE] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: slowEase }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-4 font-sans">
              Highest Tier
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-5 leading-[1.1]">
              Signature
              <br />
              <span className="text-[#C6A769]">Experience</span>
            </h2>
            <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mb-8 max-w-md mx-auto lg:mx-0">
              Pengalaman undangan yang disutradarai. Setiap elemen sinkron, motion punya makna.
            </p>

            {/* Signature Features — clean list */}
            <div className="space-y-3 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: slowEase }}
                  className="group flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-1 h-1 rounded-full bg-[#C6A769]/40 group-hover:bg-[#C6A769] transition-colors duration-300" />
                  <span className="text-[14px] text-[#1C1C1C]/70 group-hover:text-[#1C1C1C] transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <a
              href="#"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#C6A769]/20 text-[#C6A769] text-[12px] tracking-[0.15em] uppercase hover:border-[#C6A769]/40 hover:bg-[#C6A769]/5 transition-all duration-400"
            >
              Coming Soon
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C6A769]/40 group-hover:bg-[#C6A769] transition-colors duration-300" />
            </a>
          </motion.div>

          {/* Signature Template Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="flex-1 flex justify-center"
          >
            <div className="relative group">
              {/* Glow behind */}
              <div
                className="absolute -inset-10 blur-3xl opacity-30 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.3) 0%, transparent 70%)',
                }}
              />

              <div className="relative w-[240px] sm:w-[270px] aspect-[9/16] rounded-[2rem] overflow-hidden ring-1 ring-black/5 shadow-[0_25px_60px_-15px_rgba(28,28,28,0.15)] group-hover:shadow-[0_30px_70px_-15px_rgba(28,28,28,0.2)] transition-shadow duration-700">
                <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                <Image
                  src="/template-signature.png"
                  alt="Nauka Signature Template"
                  fill
                  className="object-cover transition-transform duration-[1000ms] group-hover:scale-[1.02]"
                  sizes="270px"
                />
              </div>

              {/* Signature badge */}
              <div className="absolute -top-2 -right-2 bg-[#C6A769] text-white text-[8px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(198,167,105,0.25)]">
                Signature
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
