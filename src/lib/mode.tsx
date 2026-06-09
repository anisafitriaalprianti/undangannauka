'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type NaukaMode = 'universal' | 'syari';

interface ModeContextValue {
  mode: NaukaMode | null;
  setMode: (mode: NaukaMode) => void;
  clearMode: () => void;
  isModeSelected: boolean;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<NaukaMode | null>(null);

  const setMode = useCallback((m: NaukaMode) => {
    setModeState(m);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nauka-mode', m);
    }
  }, []);

  const clearMode = useCallback(() => {
    setModeState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nauka-mode');
    }
  }, []);

  return (
    <ModeContext.Provider value={{ mode, setMode, clearMode, isModeSelected: mode !== null }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
}
