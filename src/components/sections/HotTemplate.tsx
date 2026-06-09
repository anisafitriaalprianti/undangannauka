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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (templates.length - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

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
      {/* Top blend — smooth transition from cream section above */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(180deg, rgba(246,242,238,1) 0%, rgba(246,242,238,0) 100%)' }}
      />

      <div className="nauka-frame-line hidden lg:block" />
      <div className="nauka-frame-line-right hidden lg:block" />
      <motion.div style={{ y: sectionY }} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
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

        {/* Editorial layout — 1 dominant featured, secondary subtle cascade
            Curated gallery feel, not catalog listing.
            Asymmetric composition: featured big + offset, secondary small + faded */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: slowEase }}
          className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-14 mb-12"
        >
          {/* Featured — BIG, dominant, like a magazine cover shot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: slowEase }}
            className="group cursor-pointer flex-shrink-0"
          >
            <div className="relative">
              {/* Warm glow behind featured — larger, more dramatic */}
              <div className="absolute -inset-16 pointer-events-none">
                <div
                  className="absolute top-0 left-0 w-full h-[70%]"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.12) 0%, transparent 60%)',
                    animation: 'naukaBreathLight 7s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Phone mockup — BIGGER, more dominant, editorial presence */}
              <div
                className="relative w-[300px] sm:w-[360px] lg:w-[420px] rounded-[2.5rem] p-2.5 nauka-shadow-premium ring-1 ring-white/40 transition-shadow duration-700 group-hover:shadow-[0_20px_60px_rgba(28,28,28,0.16)]"
                style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}
              >
                {/* Top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30 rounded-t-[2.5rem]" />

                {/* Light reflection shift — editorial glass */}
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
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                    <div
                      className="absolute top-0 left-0 w-[60%] h-[50%]"
                      style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(198,167,105,0.08) 0%, transparent 60%)' }}
                    />
                  </div>
                  {/* Editorial vibe label — only on featured, elegant */}
                  <div className="absolute top-[8%] left-[5%] z-10">
                    <span className="px-2.5 py-1 rounded-full text-[7px] tracking-[0.2em] uppercase text-[#C6A769] bg-[#C6A769]/15 backdrop-blur-sm">
                      {featured.vibes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reflection — phone casts a subtle reflection below */}
              <div
                className="relative w-[300px] sm:w-[360px] lg:w-[420px] mx-auto mt-1 overflow-hidden pointer-events-none"
                style={{ height: '45px' }}
              >
                <div
                  className="w-full rounded-[2rem] overflow-hidden opacity-[0.05] blur-[2px]"
                  style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18', transform: 'scaleY(-1)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 80%)' }}
                />
              </div>

              {/* Warm surface glow */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[140%] h-8 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.04) 0%, transparent 60%)',
                }}
              />

              {/* Featured info — editorial caption, no tier label */}
              <div className="mt-4 lg:text-left">
                <h3 className="font-serif text-xl text-[#1C1C1C] font-semibold group-hover:text-[#C6A769] transition-colors duration-300">
                  {featured.name}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Secondary — smaller, subtler, more faded
              Curated gallery feel — not equal weight, supporting cast */}
          <div className="flex flex-col items-center lg:items-start gap-6 lg:pt-24 lg:gap-7">
            {secondary.slice(0, 2).map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: slowEase }}
                className="group cursor-pointer"
              >
                <div
                  className="relative w-[105px] sm:w-[120px] rounded-[2rem] p-1.5 transition-all duration-700 group-hover:shadow-[0_10px_32px_rgba(28,28,28,0.1)]"
                  style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18', opacity: 0.55 }}
                >
                  {/* Secondary phones are more faded — supporting, not competing */}
                  <style>{`
                    .secondary-card:hover { opacity: 0.85 !important; }
                  `}</style>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-30 rounded-t-[2rem]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-b-xl z-20" style={{ backgroundColor: '#1C1C1C' }} />
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-[#F6F2EE]">
                    <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="120px"
                    />
                  </div>
                </div>
                {/* No vibe badge on secondary — curated, not catalog */}
                <div className="mt-2">
                  <h3 className="font-serif text-[11px] text-[#1C1C1C]/40 group-hover:text-[#C6A769] transition-colors duration-300">
                    {template.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Remaining secondary — horizontal slide for mobile */}
        <div
          className="lg:hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
          >
            {secondary.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: slowEase }}
                className="flex-shrink-0 w-[120px] snap-start group cursor-pointer"
              >
                <div
                  className="relative rounded-[2rem] p-1.5 transition-shadow duration-700 group-hover:shadow-[0_10px_32px_rgba(28,28,28,0.1)]"
                  style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-30 rounded-t-[2rem]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 rounded-b-xl z-20" style={{ backgroundColor: '#1C1C1C' }} />
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-[#F6F2EE]">
                    <div className="absolute inset-0 bg-[#F0EBE5] animate-pulse" />
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="120px"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-serif text-[11px] text-[#1C1C1C]/70 font-semibold group-hover:text-[#C6A769] transition-colors duration-300 truncate">
                    {template.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
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

        {/* View All */}
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
      </motion.div>
    </section>
  );
}
