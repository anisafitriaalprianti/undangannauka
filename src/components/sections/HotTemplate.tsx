'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const templates = [
  { id: 1, name: 'Eternal Bloom', vibes: 'Elegant', image: '/template-premium-1.png', tier: 'Premium' },
  { id: 2, name: 'Silent Vow', vibes: 'Modern', image: '/template-premium-2.png', tier: 'Premium' },
  { id: 3, name: 'Timeless Grace', vibes: 'Vintage', image: '/template-premium-3.png', tier: 'Premium' },
  { id: 4, name: 'Golden Hour', vibes: 'Cinematic', image: '/template-premium-1.png', tier: 'Premium' },
  { id: 5, name: 'Whispered Promise', vibes: 'Luxury', image: '/template-premium-2.png', tier: 'Premium' },
];

export default function HotTemplate() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // PRD: Cinematic scroll — parallax on the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  // Auto-cycle through secondary templates
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (templates.length - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Scroll to active card
  useEffect(() => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    const card = cards[activeIndex] as HTMLElement;
    if (card) {
      scrollRef.current.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const featured = templates[0];
  const secondary = templates.slice(1);

  return (
    <section ref={sectionRef} id="templates" className="nauka-atmosphere nauka-grain nauka-paper relative py-16 sm:py-20 bg-white overflow-hidden">
      {/* PRD: Editorial motif — frame lines */}
      <div className="nauka-frame-line hidden lg:block" />
      <div className="nauka-frame-line-right hidden lg:block" />
      <motion.div style={{ y: sectionY }} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header — editorial, like a magazine spread */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
          >
            Mulai dari Sini
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
          >
            Temukan Suasanamu
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: slowEase }}
            className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-[#C6A769]/40 to-transparent"
          />
        </div>

        {/* Featured Template — standalone, dominant, like a magazine cover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: slowEase }}
          className="flex justify-center mb-10 sm:mb-14"
        >
          <div className="group cursor-pointer">
            <div className="relative">
              {/* Warm glow behind featured */}
              <div className="absolute -inset-8 pointer-events-none">
                <div
                  className="absolute top-0 left-0 w-full h-[70%]"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.1) 0%, transparent 60%)',
                    animation: 'naukaBreathLight 7s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Large phone mockup */}
              <div
                className="relative w-[240px] sm:w-[280px] lg:w-[300px] rounded-[2.5rem] p-2 nauka-shadow-premium ring-1 ring-white/40 transition-shadow duration-700 group-hover:shadow-[0_16px_48px_rgba(28,28,28,0.14)]"
                style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}
              >
                {/* Top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30 rounded-t-[2.5rem]" />

                {/* Light reflection shift */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none overflow-hidden"
                  style={{ animation: 'naukaReflectionShift 9s ease-in-out infinite' }}
                >
                  <div
                    className="absolute -inset-full"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
                    }}
                  />
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl z-20" style={{ backgroundColor: '#1C1C1C' }} />

                {/* Screen */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#F6F2EE]">
                  <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 300px"
                  />
                  {/* Lighting on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                    <div
                      className="absolute top-0 left-0 w-[60%] h-[50%]"
                      style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.08) 0%, transparent 60%)' }}
                    />
                  </div>
                  {/* Featured label */}
                  <div className="absolute top-[8%] left-[5%] z-10 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[7px] tracking-[0.15em] uppercase text-[#C6A769] bg-[#C6A769]/15 backdrop-blur-sm">
                      {featured.vibes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured info — editorial caption style */}
              <div className="mt-5 text-center">
                <h3 className="font-serif text-xl text-[#1C1C1C] font-semibold group-hover:text-[#C6A769] transition-colors duration-300">
                  {featured.name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 justify-center">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#C6A769]">{featured.tier}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Templates — horizontal slide carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
          >
            {secondary.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: slowEase }}
                className="flex-shrink-0 w-[160px] sm:w-[180px] snap-start group cursor-pointer"
              >
                {/* Phone mockup */}
                <div
                  className="relative rounded-[2rem] p-1.5 transition-shadow duration-700 group-hover:shadow-[0_10px_32px_rgba(28,28,28,0.1)]"
                  style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}
                >
                  {/* Top edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-30 rounded-t-[2rem]" />

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-20" style={{ backgroundColor: '#1C1C1C' }} />

                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-[#F6F2EE]">
                    <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 160px, 180px"
                    />
                    {/* Hover lighting */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                      <div
                        className="absolute top-0 left-0 w-[60%] h-[50%]"
                        style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.08) 0%, transparent 60%)' }}
                      />
                    </div>
                    {/* Tier + vibes badge */}
                    <div className="absolute top-[8%] left-[5%] z-10 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded-full text-[6px] tracking-[0.1em] uppercase text-[#6B6B6B] bg-white/60 backdrop-blur-sm">
                        {template.vibes}
                      </span>
                      <span className="px-1 py-0.5 rounded-full text-[5px] tracking-[0.1em] uppercase text-[#C6A769] bg-[#C6A769]/10">
                        {template.tier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card info — editorial caption */}
                <div className="mt-3 px-0.5">
                  <h3 className="font-serif text-sm sm:text-[15px] text-[#1C1C1C] font-semibold group-hover:text-[#C6A769] transition-colors duration-300 truncate">
                    {template.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {secondary.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activeIndex ? 'w-6 bg-[#C6A769]' : 'w-1.5 bg-[#1C1C1C]/10 hover:bg-[#1C1C1C]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA — editorial, like "turn the page" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10 sm:mt-12"
        >
          <a href="#" className="group inline-flex items-center gap-2 text-[#6B6B6B] text-[11px] tracking-[0.2em] uppercase hover:text-[#C6A769] transition-colors duration-300">
            Lihat Semua Template
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
