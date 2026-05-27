'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const templates = [
  { id: 1, rank: '01', name: 'Eternal Bloom', vibes: 'Elegant', image: '/template-premium-1.png', users: '2,847', tier: 'Premium' },
  { id: 2, rank: '02', name: 'Silent Vow', vibes: 'Modern', image: '/template-premium-2.png', users: '3,214', tier: 'Premium' },
  { id: 3, rank: '03', name: 'Timeless Grace', vibes: 'Vintage', image: '/template-premium-3.png', users: '1,926', tier: 'Premium' },
  { id: 4, rank: '04', name: 'Golden Hour', vibes: 'Cinematic', image: '/template-premium-1.png', users: '1,543', tier: 'Premium' },
  { id: 5, rank: '05', name: 'Whispered Promise', vibes: 'Luxury', image: '/template-premium-2.png', users: '987', tier: 'Premium' },
];

export default function HotTemplate() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // PRD: Cinematic scroll — parallax on the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  // Auto-scroll with PRD pacing (4s, not too fast)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % templates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Scroll to active
  useEffect(() => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[activeIndex] as HTMLElement;
    if (card) {
      scrollRef.current.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} id="templates" className="nauka-atmosphere relative py-16 sm:py-20 bg-white overflow-hidden">
      <motion.div style={{ y: sectionY }} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Curated Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
          >
            Koleksi Template
          </motion.h2>
        </div>

        {/* Template Carousel */}
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div ref={scrollRef} className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: slowEase }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start group cursor-pointer"
              >
                {/* PRD: Depth through shadow layering, premium polished */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-black/5 transition-shadow duration-700 group-hover:nauka-shadow-premium group-hover:shadow-[0_12px_40px_rgba(28,28,28,0.12)]">
                  {/* Image */}
                  <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="320px"
                  />

                  {/* Gradient overlay — PRD: depth terasa, layering matang */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* PRD: Lighting on hover — directional warm light from top-left */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div
                      className="absolute top-0 left-0 w-[60%] h-[50%]"
                      style={{
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.08) 0%, transparent 60%)',
                      }}
                    />
                  </div>

                  {/* Shimmer sweep on hover — PRD: subtle, not excessive */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                  </div>

                  {/* Decorative vertical line — editorial motif */}
                  <div className="absolute right-4 top-0 bottom-0 w-px bg-white/10 group-hover:bg-[#C6A769]/30 transition-colors duration-500" />

                  {/* Rank watermark */}
                  <span className="absolute top-3 right-5 font-serif text-7xl text-white/[0.07] font-bold leading-none select-none pointer-events-none">
                    {template.rank}
                  </span>

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[8px] tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-sm">
                      {template.vibes}
                    </span>
                    <span className="px-2 py-1 rounded-full text-[7px] tracking-[0.1em] uppercase text-[#C6A769] bg-[#C6A769]/10">
                      {template.tier}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl text-white font-semibold mb-1 group-hover:text-[#D4BA82] transition-colors duration-300">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                      <span className="text-[10px] text-white/50">{template.users} pengguna</span>
                    </div>

                    {/* Preview button — PRD: motion tidak boleh mengganggu membaca */}
                    <div className="mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] tracking-[0.2em] uppercase border border-white/20">
                        Preview
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activeIndex ? 'w-6 bg-[#C6A769]' : 'w-1.5 bg-[#1C1C1C]/10 hover:bg-[#1C1C1C]/20'
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + templates.length) % templates.length)}
              className="w-10 h-10 rounded-full border border-[#C6A769]/20 flex items-center justify-center hover:border-[#C6A769]/40 hover:bg-[#C6A769]/5 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % templates.length)}
              className="w-10 h-10 rounded-full border border-[#C6A769]/20 flex items-center justify-center hover:border-[#C6A769]/40 hover:bg-[#C6A769]/5 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a href="#" className="group inline-flex items-center gap-2 text-[#6B6B6B] text-[11px] tracking-[0.2em] uppercase hover:text-[#C6A769] transition-colors duration-300">
            Lihat Semua Template
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
