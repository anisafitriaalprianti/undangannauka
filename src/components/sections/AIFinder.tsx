'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const steps = [
  {
    number: '01',
    question: 'Kata kata apa yang mau kamu pakai?',
    options: ['Islam', 'Umum'],
  },
  {
    number: '02',
    question: 'Tema adat apa yang kamu mau pakai?',
    options: ['Jawa', 'Sunda', 'Batak', 'Betawi', 'Bali', 'Minang', 'Palembang', 'Melayu', 'Bugis', 'Aceh', 'Toraja', 'Madura', 'China', 'Jepang', 'Korea', 'Minimal Adat'],
  },
  {
    number: '03',
    question: 'Vibes apa yang kamu suka?',
    options: ['Cinematic', 'Modern', 'Vintage', 'Black & White', 'Luxury', 'Mewah', 'Minimalis', 'Romantis', 'Garden', 'Boho', 'Fairytale', 'Pastel', 'Tropical', 'Rustic', 'Elegant'],
  },
];

export default function AIFinder() {
  const [phase, setPhase] = useState<'idle' | 'step' | 'result'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);

  const startFinder = () => {
    setPhase('step');
    setCurrentStep(0);
    setAnswers([null, null, null]);
  };

  const selectOption = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setPhase('result');
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setPhase('idle');
    setCurrentStep(0);
    setAnswers([null, null, null]);
  };

  const currentAnswer = answers[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <section id="ai-finder" className="relative py-16 sm:py-20 bg-white">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {/* ===== IDLE — intro screen ===== */}
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: slowEase }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: cinematicEase }}
                className="text-[10px] tracking-[0.5em] uppercase text-[#C6A769] mb-3 font-sans"
              >
                Bantuan Pilih
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
                className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-3"
              >
                Belum Punya Konsep?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[14px] text-[#6B6B6B] mb-8"
              >
                Tiga pertanyaan, kami carikan yang paling cocok.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35, ease: slowEase }}
                onClick={startFinder}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#C6A769] text-white text-[13px] font-medium tracking-[0.15em] uppercase hover:bg-[#D4BA82] transition-all duration-500"
              >
                Mulai
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* ===== STEP — one question at a time ===== */}
          {phase === 'step' && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: slowEase }}
              className="bg-[#F6F2EE] rounded-2xl p-6 sm:p-8 ring-1 ring-black/5"
            >
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === currentStep ? 'w-8 bg-[#C6A769]' : i < currentStep ? 'w-4 bg-[#C6A769]/40' : 'w-4 bg-[#1C1C1C]/8'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="mb-6">
                <span className="font-mono text-[11px] tracking-[0.3em] text-[#C6A769]/40 block mb-2">
                  {steps[currentStep].number}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1C1C] leading-[1.3]">
                  {steps[currentStep].question}
                </h3>
              </div>

              {/* Options */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => selectOption(option)}
                    className={`px-5 py-2.5 rounded-full text-[13px] transition-all duration-300 ${
                      currentAnswer === option
                        ? 'bg-[#C6A769] text-white shadow-[0_2px_12px_rgba(198,167,105,0.2)]'
                        : 'bg-white text-[#6B6B6B] ring-1 ring-black/5 hover:ring-[#C6A769]/20 hover:text-[#1C1C1C]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={goBack}
                  className="text-[11px] tracking-[0.2em] uppercase text-[#999] hover:text-[#1C1C1C] transition-colors duration-300"
                >
                  Kembali
                </button>
                <button
                  onClick={goNext}
                  disabled={!currentAnswer}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#C6A769] text-white text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-[#D4BA82] transition-all duration-400 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#C6A769]"
                >
                  {isLastStep ? 'Selesai' : 'Lanjut'}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* ===== RESULT — more exciting, less anticlimactic ===== */}
          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: slowEase }}
              className="text-center bg-[#F6F2EE] rounded-2xl p-8 sm:p-10 ring-1 ring-black/5"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C6A769]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-[#1C1C1C] mb-2">
                Kami Udah Temukan
              </h3>
              <p className="text-[13px] text-[#6B6B6B] leading-[1.7] mb-4 max-w-sm mx-auto">
                Berdasarkan pilihanmu, kami sudah punya rekomendasi yang cocok. Segera hadir.
              </p>

              {/* Selection summary — like a mood board */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {answers.filter(Boolean).map((answer, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-[11px] bg-[#C6A769]/10 text-[#C6A769]">
                    {answer}
                  </span>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="text-[#C6A769]/70 text-[11px] tracking-[0.2em] uppercase hover:text-[#C6A769] transition-colors duration-300"
              >
                Pilih Ulang
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
