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
      {/* PRD: Editorial motif — frame lines */}
      <div className="nauka-frame-line hidden lg:block" />
      <div className="nauka-frame-line-right hidden lg:block" />
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
                className="flex-shrink-0 w-[180px] sm:w-[200px] snap-start group cursor-pointer"
              >
                {/* Phone mockup — same style as Hero */}
                <div className="relative rounded-[2rem] p-1.5 transition-shadow duration-700 group-hover:nauka-shadow-premium group-hover:shadow-[0_12px_40px_rgba(28,28,28,0.12)]" style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}>
                  {/* Top edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30 rounded-t-[2rem]" />

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-20" style={{ backgroundColor: '#1C1C1C' }} />

                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-[#F6F2EE]">
                    {/* Placeholder shimmer */}
                    <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="200px"
                    />

                    {/* PRD: Lighting on hover — directional warm light from top-left */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div
                        className="absolute top-0 left-0 w-[60%] h-[50%]"
                        style={{
                          background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.08) 0%, transparent 60%)',
                        }}
                      />
                    </div>

                    {/* Rank watermark */}
                    <span className="absolute top-8 right-3 font-serif text-5xl text-[#1C1C1C]/[0.04] font-bold leading-none select-none pointer-events-none">
                      {template.rank}
                    </span>

                    {/* Tier badge — inside screen */}
                    <div className="absolute top-6 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[7px] tracking-[0.15em] uppercase text-[#6B6B6B] bg-white/60 backdrop-blur-sm">
                        {template.vibes}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full text-[6px] tracking-[0.1em] uppercase text-[#C6A769] bg-[#C6A769]/10">
                        {template.tier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card info — below phone mockup */}
                <div className="mt-4 px-1">
                  <h3 className="font-serif text-lg text-[#1C1C1C] font-semibold group-hover:text-[#C6A769] transition-colors duration-300">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span className="text-[11px] text-[#999]">{template.users} pengguna</span>
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
