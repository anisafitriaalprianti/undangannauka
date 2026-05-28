# T6 — Cinematic Ambience Component

## Task: Create CinematicAmbience.tsx and integrate into premium-1 template

### What was done:
1. **Created** `/home/z/my-project/src/components/template/premium-1/CinematicAmbience.tsx`
   - Procedural ambient soundscape using Web Audio API (no audio files)
   - Three audio layers:
     - **Night Wind**: Bandpass-filtered white noise (200-600Hz, vol 0.015) with LFO on filter frequency
     - **Warm Drone**: Sine oscillators at 110Hz + 220Hz (vol 0.008) with volume LFO for breathing
     - **Air Texture**: High-frequency bandpass noise (2000-4000Hz, vol 0.005)
   - Lazy AudioContext creation on `active=true` (autoplay policy compliant)
   - 3-second fade-in on activation, 2-second fade-out on deactivation
   - Full cleanup on unmount via refs and useCallback
   - Returns `null` (no visual output)

2. **Integrated** into `/home/z/my-project/src/app/template/premium-1/page.tsx`
   - Added import for CinematicAmbience
   - Placed `<CinematicAmbience active={invitationOpened} />` inside `<main>`, before AnimatePresence blocks

3. **Build verified**: `bun run build` — ✓ Compiled successfully
4. **Lint**: CinematicAmbience.tsx has zero errors/warnings. Pre-existing errors in HandwritingText.tsx and useAutoScroll.ts are unrelated.

### Key Technical Decisions:
- Declared `cleanupAll` before `stopAmbience` to satisfy react-hooks/immutability rule (no accessing variables before declaration)
- All audio nodes stored in `useRef` for stable references across renders
- `isStartedRef` and `isFadingOutRef` prevent double-start and double-cleanup race conditions
- AudioContext created inside `startAmbience` (called from useEffect triggered by user gesture) for autoplay compliance
