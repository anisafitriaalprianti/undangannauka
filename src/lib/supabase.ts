/**
 * NAUKA PRODUCTION: Supabase Client
 *
 * 🔥 createClient LANGSUNG — TIDAK ADA:
 *   - hardcoded URL
 *   - fallback config / dummy config
 *   - localStorage config
 *   - globalThis caching
 *   - lazy getter yang return null
 *
 * Jika ENV undefined → supabase = null → isSupabaseConfigured() = false → error jelas di UI
 *
 * Required env:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js';

// 🔍 Debug: log raw ENV values at module load time
console.log("ENV URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("ENV KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/**
 * Supabase client — langsung createClient(process.env.URL, process.env.KEY)
 * ⚠️ Tidak ada fallback config. Jika ENV kosong → supabase = null → error jelas.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase ENV belum terbaca", {
    supabaseUrl,
    supabaseKey,
  });
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/** Returns true if both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set */
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
