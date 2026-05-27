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

export default function Home() {
  return (
    <main className="bg-[#F6F2EE] min-h-screen">
      <Navbar />
      <Hero />
      <HotTemplate />
      <AIFinder />
      <WhyNauka />
      <SignatureShowcase />
      <Testimonials />
      <Process />
      <Closing />
    </main>
  );
}
