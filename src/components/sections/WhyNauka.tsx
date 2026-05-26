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
  return (
    <section id="why-nauka" className="relative bg-[#050505] py-28 md:py-36">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
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

        {/* Principles Grid — last 2 centered on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {principles.map((principle, index) => (
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
              className={`group relative bg-[#080808] border border-white/[0.03] p-8 sm:p-9 hover:border-[#c9a96e]/8 transition-all duration-700 hover:bg-[#0a0908] ${
                // Center last 2 items on large screens
                index === 3 ? 'lg:col-start-1 lg:col-end-2 lg:justify-self-end lg:w-full' : ''
              }`}
              style={index >= 3 ? { gridColumn: index === 3 ? '1 / 2' : '2 / 3', justifySelf: index === 3 ? 'end' : 'start', width: '100%' } : {}}
            >
              {/* Number — mono, dim */}
              <span className="block text-[10px] tracking-[0.3em] text-[#c9a96e]/25 mb-6 font-mono group-hover:text-[#c9a96e]/40 transition-colors duration-500">
                {principle.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#f5f0e8] mb-4 group-hover:text-[#c9a96e] transition-colors duration-500">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-[#8a8578] leading-[1.7]">
                {principle.description}
              </p>

              {/* Accent line on hover — grows from left */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#c9a96e]/40 to-transparent group-hover:w-full transition-all duration-[900ms]" />

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-b from-[#c9a96e]/[0.01] to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Manifesto Statement — cinematic reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.2, ease: slowEase }}
          className="mt-20 md:mt-28 text-center"
        >
          <div className="relative inline-block">
            {/* Decorative quotes */}
            <span className="absolute -top-6 -left-4 text-[#c9a96e]/10 font-serif text-5xl">&ldquo;</span>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-[#f5f0e8]/85 italic leading-[1.4] max-w-3xl mx-auto">
              Bukan sekadar undangan. Sebuah pengalaman.
            </blockquote>
            <span className="absolute -bottom-8 -right-2 text-[#c9a96e]/10 font-serif text-5xl">&rdquo;</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
