'use client';

import Cover from '@/components/template/premium-1/Cover';
import Scene1 from '@/components/template/premium-1/Scene1';
import Scene2 from '@/components/template/premium-1/Scene2';
import Gallery from '@/components/template/premium-1/Gallery';
import RSVP from '@/components/template/premium-1/RSVP';
import Closing from '@/components/template/premium-1/Closing';

export default function Home() {
  return (
    <main className="bg-[#F5F0E8] min-h-dvh">
      <Cover />
      <Scene1 />
      <Scene2 />
      <Gallery />
      <RSVP />
      <Closing />
    </main>
  );
}
