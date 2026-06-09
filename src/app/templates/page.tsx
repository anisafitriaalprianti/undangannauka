'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMode, type NaukaMode } from '@/lib/mode';
import { getTemplatesByMode, type Template } from '@/registry/templates';

const slowEase = [0.16, 1, 0.3, 1];

/* Display extensions for catalog cards — registry is single source of truth */
interface CatalogDisplay extends Template {
  image: string;
  slug: string;
  features: string[];
}

const catalogData: CatalogDisplay[] = [
  {
    id: 'basic-calm',
    name: 'Basic Calm',
    modes: ['universal', 'syari'],
    description: 'Simple, clean, elegan. Fokus pada informasi utama dalam tampilan yang tenang.',
    image: '/template-premium-1.png',
    slug: 'basic-calm',
    features: ['Nama Pengantin', 'Tanggal & Waktu', 'Lokasi Acara', 'Doa Penutup'],
  },
  {
    id: 'syari-calm',
    name: "Syar'i Calm",
    modes: ['syari'],
    description: 'Adab & nuansa lembut. Dilengkapi doa dan adab menghadiri acara.',
    image: '/template-premium-1.png',
    slug: 'syari-calm',
    features: ['Nama Pengantin', 'Tanggal & Waktu', 'Lokasi Acara', 'Adab Acara', 'Doa Penutup'],
  },
];

function ModeBadge({ modes }: { modes: NaukaMode[] }) {
  const isUniversal = modes.includes('universal');
  const isSyari = modes.includes('syari');

  if (isUniversal && isSyari) {
    return (
      <span className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-sans bg-[#6B6B6B]/8 text-[#6B6B6B]/60 border border-[#6B6B6B]/10">
        Universal + Syar&apos;i
      </span>
    );
  }
  if (isSyari) {
    return (
      <span className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-sans bg-[#C6A769]/10 text-[#C6A769] border border-[#C6A769]/20">
        Syar&apos;i
      </span>
    );
  }
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-sans bg-[#6B6B6B]/8 text-[#6B6B6B]/60 border border-[#6B6B6B]/10">
      Universal
    </span>
  );
}

function TemplateCard({
  template,
  index,
}: {
  template: CatalogDisplay;
  index: number;
}) {
  const router = useRouter();

  const handleSelect = () => {
    router.push(`/create?template=${template.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: slowEase }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden nauka-shadow-premium ring-1 ring-black/[0.03] hover:ring-[#C6A769]/15 transition-all duration-500"
    >
      {/* Phone Mockup Preview */}
      <div className="relative aspect-[9/14] overflow-hidden bg-[#F6F2EE]">
        <Image
          src={template.image}
          alt={`Template ${template.name}`}
          fill
          className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Mode Badge */}
        <div className="flex items-center gap-3 mb-3">
          <ModeBadge modes={template.modes} />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1C] italic mb-2">
          {template.name}
        </h3>

        <p className="text-[13px] text-[#6B6B6B]/70 leading-[1.65] mb-4 flex-1">
          {template.description}
        </p>

        {/* Features list */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {template.features.map((feature) => (
            <span
              key={feature}
              className="inline-block px-2.5 py-1 rounded-md text-[10px] tracking-[0.05em] bg-[#F6F2EE] text-[#6B6B6B]/60 font-sans"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSelect}
          className="group/btn w-full py-3 rounded-full text-center text-[11px] tracking-[0.2em] uppercase font-sans bg-[#C6A769] text-white hover:bg-[#D4BA82] transition-all duration-500 cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            Pilih Template
            <svg
              className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
}

function TemplatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setMode } = useMode();

  const modeParam = searchParams.get('mode') as NaukaMode | null;

  // Sync mode from URL param to context
  if (modeParam && (modeParam === 'universal' || modeParam === 'syari')) {
    setMode(modeParam);
  }

  // Get templates filtered by mode from registry
  const registryTemplates = getTemplatesByMode(modeParam);

  // Map registry templates to catalog display data
  const visibleTemplates = catalogData.filter((t) =>
    registryTemplates.some((rt) => rt.id === t.id)
  );

  return (
    <main className="min-h-screen bg-[#F6F2EE] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: slowEase }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C6A769]/30" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A769] font-sans">
              Koleksi Template
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C6A769]/30" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-[1.15] mb-4">
            Pilih Template{' '}
            <span className="text-[#C6A769]">Undanganmu</span>
          </h1>

          <p className="text-[15px] text-[#6B6B6B]/60 max-w-lg mx-auto leading-[1.7]">
            Setiap template dirancang agar tamu merasakan momenmu dengan tenang.
          </p>

          {/* Mode indicator */}
          {modeParam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4"
            >
              <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans border ${
                modeParam === 'syari'
                  ? 'bg-[#C6A769]/10 text-[#C6A769] border-[#C6A769]/20'
                  : 'bg-[#6B6B6B]/8 text-[#6B6B6B]/60 border-[#6B6B6B]/10'
              }`}>
                Mode: {modeParam === 'syari' ? "Syar'i" : 'Universal'}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {visibleTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
            />
          ))}
        </div>

        {/* Back to mode selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push('/mode')}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#999]/50 font-sans hover:text-[#C6A769]/60 transition-colors duration-300 cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            Ganti Mode
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center">
        <div className="text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]/40 font-sans">
          Memuat template...
        </div>
      </main>
    }>
      <TemplatesContent />
    </Suspense>
  );
}
