'use client';

import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import HotTemplate from '@/components/sections/HotTemplate';
import AIFinder from '@/components/sections/AIFinder';
import WhyNauka from '@/components/sections/WhyNauka';
import SignatureShowcase from '@/components/sections/SignatureShowcase';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import Closing from '@/components/sections/Closing';
import { motion } from 'framer-motion';

/* PRD: Homepage as a journey — not separate blocks.
   Each section flows into the next with lighting continuity.
   The fade rhythm is like scene transitions in a film:
   slow dissolve, not hard cuts. */

const sectionFade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Home() {
  return (
    <main className="bg-[#F6F2EE] min-h-screen nauka-warm-wash">
      {/* Page load curtain — warm cream fades away like lights dimming before a film */}
      <div className="nauka-curtain" />
      <Navbar />

      {/* Act I — The Opening: Hero sets the emotional tone */}
      <Hero />

      {/* Act II — Discovery: Templates & AI Finder flow together */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <HotTemplate />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <AIFinder />
      </motion.div>

      {/* Act III — Understanding: Why Nauka, Signature, Testimonials
          Lighting shifts subtly — cream to white and back, like natural light through a day */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <WhyNauka />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <SignatureShowcase />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <Testimonials />
      </motion.div>

      {/* Act IV — The Journey Home: Process + Closing
          Warm return — back to the feeling, the resolution */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <Process />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionFade}
      >
        <Closing />
      </motion.div>
    </main>
  );
}
