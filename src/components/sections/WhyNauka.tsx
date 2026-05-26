'use client';

import { motion } from 'framer-motion';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

const principles = [
  {
    number: '01',
    title: 'Cinematic Clarity',
    description:
      'Cinematic bukan berarti ramai. Cinematic berarti pacing, atmosphere, emotional direction, dan hierarchy yang tepat.',
    featured: true,
  },
  {
    number: '02',
    title: 'Meaningful Motion',
    description:
      'Setiap gerakan harus memiliki alasan. Animasi tidak boleh hadir hanya karena keren. Jika motion dihapus dan feel tetap sama, motion itu tidak penting.',
  },
  {
    number: '03',
    title: 'Emotional Storytelling',
    description:
      'Setiap karya harus memiliki rasa. Bukan hanya bagus secara visual, tapi terasa hidup, berasa, punya soul.',
  },
  {
    number: '04',
    title: 'Crafted Atmosphere',
    description:
      'Lighting harus terasa hadir. Background harus mengalah demi konten. Setiap elemen mendukung mood dan focus.',
  },
  {
    number: '05',
    title: 'Visual Harmony',
    description:
      'Hierarchy jelas, informasi terbaca, tidak ada elemen yang bentrok. Keindahan lahir dari keseimbangan, bukan dari keramaian.',
  },
];

export default function WhyNauka() {
  const featured = principles.find((p) => p.featured)!;
  const others = principles.filter((p) => !p.featured);

  return (
    <section id="why-nauka" className="nauka-atmosphere-manifesto relative py-28 md:py-36">
      {/* Warm transition from AI Finder */}
      <div className="nauka-transition-warm" />

      {/* Section divider */}
      <div className="nauka-divider-warm" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-5 font-sans"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-5"
          >
            Kenapa Nauka?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[#8a8578] text-[15px] max-w-lg mx-auto leading-[1.7]"
          >
            Nauka bukan marketplace template. Nauka adalah studio undangan digital yang mengejar feel, taste, dan soul.
          </motion.p>
        </div>

        {/* Featured Principle — full width, cinematic impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: slowEase }}
          className="group relative bg-[#0b0a07] border border-[#c9a96e]/[0.06] p-10 sm:p-14 md:p-16 mb-6 md:mb-8 hover:border-[#c9a96e]/10 transition-all duration-700 overflow-hidden"
        >
          {/* Atmospheric glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c9a96e]/[0.02] rounded-full blur-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Featured marker */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#c9a96e]/30 group-hover:text-[#c9a96e]/50 transition-colors duration-500">
              {featured.number}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c9a96e]/10 to-transparent" />
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/20">Core Principle</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-500 mb-6 leading-[1.15]">
            {featured.title}
          </h3>

          {/* Description */}
          <p className="text-[16px] sm:text-lg text-[#8a8578] leading-[1.75] max-w-2xl">
            {featured.description}
          </p>

          {/* Bottom gold accent */}
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#c9a96e]/40 via-[#c9a96e]/20 to-transparent group-hover:w-full transition-all duration-[1200ms]" />
        </motion.div>

        {/* Other Principles — asymmetric 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {others.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.9,
                delay: index * 0.1,
                ease: slowEase,
              }}
              className="group relative bg-[#0a0908] border border-white/[0.03] p-8 sm:p-9 hover:border-[#c9a96e]/8 transition-all duration-700 hover:bg-[#0c0b08]"
            >
              {/* Number + thin line */}
              <div className="flex items-center gap-3 mb-6">
                <span className="block text-[10px] tracking-[0.3em] text-[#c9a96e]/20 font-mono group-hover:text-[#c9a96e]/40 transition-colors duration-500">
                  {principle.number}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/[0.03] to-transparent" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#f5f0e8] mb-4 group-hover:text-[#c9a96e] transition-colors duration-500">
                {principle.title}
              </h3>

              <p className="text-[14px] text-[#8a8578] leading-[1.7]">
                {principle.description}
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#c9a96e]/30 to-transparent group-hover:w-full transition-all duration-[900ms]" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-b from-[#c9a96e]/[0.008] to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Manifesto Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.2, ease: slowEase }}
          className="mt-20 md:mt-28 text-center relative"
        >
          {/* Atmospheric glow behind the quote */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#c9a96e]/[0.02] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#c9a96e]/8 font-serif text-6xl leading-none select-none">&ldquo;</span>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] lg:text-5xl text-[#f5f0e8]/85 italic leading-[1.3] max-w-3xl mx-auto">
              Bukan sekadar undangan.
              <br />
              <span className="text-[#c9a96e]/80">Sebuah pengalaman.</span>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
