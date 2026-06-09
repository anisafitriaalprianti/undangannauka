'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMode, type NaukaMode } from '@/lib/mode';

const ease = [0.25, 0.46, 0.45, 0.94];

const modes: {
  id: NaukaMode;
  label: string;
  subtitle: string;
  description: string;
  accent: string;
  borderColor: string;
  hoverBorder: string;
}[] = [
  {
    id: 'universal',
    label: 'Universal Calm',
    subtitle: 'Netral & Elegan',
    description:
      'Pengalaman undangan yang bersih dan tenang. Tanpa elemen religius. Cocok untuk semua tamu.',
    accent: '#6B6B6B',
    borderColor: 'border-[#6B6B6B]/10',
    hoverBorder: 'hover:border-[#6B6B6B]/30',
  },
  {
    id: 'syari',
    label: "Syar'i Calm",
    subtitle: 'Sopan & Bermakna',
    description:
      "Undangan dengan sentuhan islami — doa, adab, dan bahasa yang penuh makna. Tetap minimal.",
    accent: '#C6A769',
    borderColor: 'border-[#C6A769]/15',
    hoverBorder: 'hover:border-[#C6A769]/35',
  },
];

export default function ModePage() {
  const router = useRouter();
  const { setMode } = useMode();

  const handleSelect = (mode: NaukaMode) => {
    setMode(mode);
    router.push(`/templates?mode=${mode}`);
  };

  return (
    <main className="min-h-screen bg-[#F6F2EE] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-10"
        >
          <img
            src="/logo-nauka.svg"
            alt="Nauka"
            className="h-28 sm:h-32 w-auto mx-auto mb-6"
          />
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]/40 font-sans">
            Pilih pengalaman undanganmu
          </p>
        </motion.div>

        {/* Mode cards */}
        <div className="flex flex-col sm:flex-row gap-4">
          {modes.map((m, index) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease }}
              onClick={() => handleSelect(m.id)}
              className={`group flex-1 text-left bg-white rounded-2xl p-6 sm:p-7 ring-1 ring-black/[0.03] border ${m.borderColor} ${m.hoverBorder} transition-all duration-500 cursor-pointer`}
            >
              {/* Dot indicator */}
              <div
                className="w-2 h-2 rounded-full mb-4"
                style={{ backgroundColor: m.accent, opacity: 0.6 }}
              />

              <h2 className="font-serif text-lg sm:text-xl text-[#1C1C1C] italic mb-1">
                {m.label}
              </h2>

              <p
                className="text-[10px] tracking-[0.15em] uppercase font-sans mb-4"
                style={{ color: m.accent, opacity: 0.7 }}
              >
                {m.subtitle}
              </p>

              <p className="text-[13px] text-[#6B6B6B]/60 leading-[1.7] font-sans">
                {m.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Subtle note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[10px] text-[#999]/40 font-sans mt-8"
        >
          Kamu bisa mengganti mode nanti.
        </motion.p>
      </div>
    </main>
  );
}
