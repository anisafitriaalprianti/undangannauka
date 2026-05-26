'use client';

import { motion } from 'framer-motion';

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
    <section id="why-nauka" className="relative bg-[#050505] py-24 md:py-32">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-[#c9a96e]/20" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4 font-sans">
            Our Philosophy
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Kenapa Nauka?
          </h2>
          <p className="text-[#8a8578] text-base max-w-lg mx-auto leading-relaxed">
            Nauka bukan marketplace template. Nauka adalah studio undangan digital yang mengejar feel, taste, dan soul.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative bg-[#0a0a0a] border border-white/[0.03] p-7 sm:p-8 hover:border-[#c9a96e]/10 transition-all duration-500"
            >
              {/* Number */}
              <span className="block text-[10px] tracking-[0.3em] text-[#c9a96e]/40 mb-5 font-mono">
                {principle.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#f5f0e8] mb-4 group-hover:text-[#c9a96e] transition-colors duration-300">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#8a8578] leading-relaxed">
                {principle.description}
              </p>

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a96e]/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Manifesto Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 md:mt-24 text-center"
        >
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f0e8]/80 italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;Bukan sekadar undangan. Sebuah pengalaman.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
