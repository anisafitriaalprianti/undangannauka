'use client';

import { motion } from 'framer-motion';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const testimonials = [
  { text: 'Tamu-tamu langsung bilang, "Undangannya beda banget." Itu yang bikin senang.', name: 'Rina S.' },
  { text: 'Detailnya bener-bener diperhatikan. Dari font sampai animasi, semuanya selaras.', name: 'Budi P.' },
  { text: 'Bikin tamu-tamu langsung merasa spesial sebelum datang ke acara.', name: 'Anisa M.', featured: true },
  { text: 'Ga nyangka undangan digital bisa terasa begitu personal dan hangat.', name: 'Dewi A.' },
];

export default function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const others = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="nauka-light-warm nauka-grain nauka-paper relative py-16 sm:py-20 bg-white overflow-hidden">
      {/* Top blend — smooth transition from cream section above */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(180deg, rgba(246,242,238,1) 0%, rgba(246,242,238,0) 100%)' }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header — not "Real Reactions", something warmer */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Yang Mereka Rasakan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
          >
            Kata Mereka
          </motion.h2>
        </div>

        {/* Featured Testimonial — like a pull quote in a magazine */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: slowEase }}
          className="group relative bg-[#1C1C1C] rounded-2xl p-8 sm:p-10 md:-translate-y-3 shadow-xl mb-5 overflow-hidden"
        >
          {/* PRD: Lighting felt — subtle warm highlight on featured card */}
          <div
            className="absolute top-0 right-0 w-[50%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 70% 20%, rgba(198,167,105,0.05) 0%, transparent 60%)',
            }}
          />

          <span className="absolute top-4 left-6 text-white/[0.05] font-serif text-6xl leading-none select-none">&ldquo;</span>

          <p className="font-serif text-xl sm:text-2xl text-white/90 italic leading-[1.5] mb-6 relative z-10 max-w-3xl">
            {featured.text}
          </p>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6A769]/20 flex items-center justify-center text-[10px] font-semibold text-[#C6A769]">
              {featured.name.charAt(0)}
            </div>
            <span className="text-[13px] text-white/80 font-medium">{featured.name}</span>
          </div>
        </motion.div>

        {/* Other Testimonials — human, no labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: slowEase }}
              className="group relative bg-[#F6F2EE] rounded-2xl p-6 sm:p-8 ring-1 ring-black/5 hover:ring-[#C6A769]/15 transition-all duration-500 overflow-hidden"
            >
              {/* PRD: subtle directional light on hover */}
              <div className="absolute top-0 left-0 w-[40%] h-[30%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.04) 0%, transparent 60%)' }} />
              </div>

              <span className="absolute top-3 left-4 text-[#C6A769]/[0.08] font-serif text-3xl leading-none select-none">&ldquo;</span>

              <p className="font-serif text-lg text-[#1C1C1C]/80 italic leading-[1.6] mb-5 relative z-10">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#C6A769]/10 flex items-center justify-center text-[8px] font-semibold text-[#C6A769]">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="text-[12px] text-[#1C1C1C]/70">{testimonial.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
