/**
 * NAUKA PRODUCTION: Role System — Owner vs Guest
 *
 * Owner = pembuat undangan (punya data di localStorage/Supabase)
 * Guest = penerima undangan (buka link share, tidak punya data lokal)
 *
 * 🔥 Role is determined by URL ?to= param OR localStorage presence
 */

export type Role = 'owner' | 'guest';

export interface RoleState {
  role: Role;
  isOwner: boolean;
  isGuest: boolean;
}

/** Determine role from localStorage data (quick check) */
export function getRole(slug: string): RoleState {
  if (typeof window === 'undefined') {
    return { role: 'guest', isOwner: false, isGuest: true };
  }

  // Check URL first — if ?to= is present, this is definitely a guest
  const params = new URLSearchParams(window.location.search);
  if (params.has('to')) {
    return { role: 'guest', isOwner: false, isGuest: true };
  }

  // Check localStorage for invitation data
  const raw = localStorage.getItem(`nauka_inv_${slug}`);
  const isOwner = !!raw;

  return {
    role: isOwner ? 'owner' : 'guest',
    isOwner,
    isGuest: !isOwner,
  };
}
