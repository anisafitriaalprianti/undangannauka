/**
 * NAUKA PRODUCTION: Invitation Utilities
 *
 * 🔥 SINGLE DATA SOURCE: Supabase
 * ❌ NO localStorage for guests/RSVPs
 * ✅ localStorage ONLY for invitation create form (temporary cache)
 *
 * This module provides:
 * - Type definitions (InvitationData, RSVPStatus, etc.)
 * - Slug generation & guest link generation
 * - File parsing (CSV/TXT → guest names)
 * - Share text generation
 * - Invitation localStorage helpers (for create flow only)
 *
 * All guest/RSVP data operations are in db.ts (Supabase).
 */

import type { NaukaMode } from './mode';

/* =========================
   TYPES
========================= */

export interface InvitationData {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  location: string;
  personalMessage: string;
  template: string;
  mode: NaukaMode;
  createdAt: string;
}

export interface LoadResult {
  status: 'ok' | 'not_found';
  data: InvitationData | null;
  message?: string;
}

export type RSVPStatus = 'hadir' | 'tidak';

export interface RSVPEntry {
  status: RSVPStatus;
  time: string;
}

export interface GuestLink {
  name: string;
  link: string;
}

export interface GenerateGuestLinksOptions {
  baseUrl: string;
  slug: string;
  guestList: string[];
}

/* =========================
   INVITATION STORAGE (localStorage — CREATE FLOW ONLY)
========================= */

/** Save invitation to localStorage (used by create flow) */
export function saveInvitation(slug: string, data: InvitationData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`nauka_inv_${slug}`, JSON.stringify(data));
}

/** Get invitation from localStorage */
export function getInvitation(slug: string): InvitationData | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(`nauka_inv_${slug}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InvitationData;
  } catch {
    return null;
  }
}

/** Safe load for page — returns { status, data } */
export function loadInvitation(slug: string): LoadResult {
  const data = getInvitation(slug);

  if (!data) {
    return {
      status: 'not_found',
      data: null,
      message: 'Undangan tidak ditemukan',
    };
  }

  return {
    status: 'ok',
    data,
  };
}

/** Delete invitation from localStorage */
export function deleteInvitation(slug: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`nauka_inv_${slug}`);
}

/** List all saved invitation slugs */
export function listInvitations(): string[] {
  if (typeof window === 'undefined') return [];
  const slugs: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('nauka_inv_')) {
      slugs.push(key.replace('nauka_inv_', ''));
    }
  }
  return slugs;
}

/* =========================
   SLUG GENERATION
========================= */

export function generateSlug(groomName: string, brideName: string): string {
  return `${groomName}-${brideName}`
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/* =========================
   GUEST PERSONALIZATION
========================= */

/** Get guest name from ?to= URL param */
export function getGuestName(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const name = params.get('to');
  return name ? decodeURIComponent(name) : null;
}

/** Build personalized invitation link with ?to= param */
export function buildInvitationLink(baseUrl: string, slug: string, guestName?: string): string {
  const encoded = guestName ? encodeURIComponent(guestName) : '';
  return `${baseUrl}/i/${slug}${encoded ? `?to=${encoded}` : ''}`;
}

/* =========================
   GUEST FILE PARSER
   Excel / CSV / TXT → guest name list
========================= */

/** Parse a CSV or TXT file into an array of guest names */
export async function parseGuestFile(file: File): Promise<string[]> {
  const text = await file.text();

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Skip common header row
  const cleaned = lines.filter(
    (l) => l.toLowerCase() !== 'name' && l.toLowerCase() !== 'nama' && l.toLowerCase() !== 'nama tamu'
  );

  // Handle CSV: if a line has commas, take the first column
  const names = cleaned.map((l) => {
    const firstCol = l.split(',')[0].trim();
    // Strip quotes if wrapped
    return firstCol.replace(/^["']|["']$/g, '');
  });

  return names.filter(Boolean);
}

/* =========================
   GUEST LINK GENERATOR (BATCH)
   Guest names → personalized links
========================= */

/** Generate personalized invitation links for a list of guests */
export function generateGuestLinks({ baseUrl, slug, guestList }: GenerateGuestLinksOptions): GuestLink[] {
  return guestList.map((name) => {
    const trimmed = name.trim();
    const encodedName = encodeURIComponent(trimmed);

    return {
      name: trimmed,
      link: `${baseUrl}/i/${slug}?to=${encodedName}`,
    };
  });
}

/* =========================
   SHARE TEXT (MODE-AWARE)
========================= */

/** Generate share text based on mode — Syar'i uses Islamic greeting */
export function generateShareText(invitation: InvitationData, url: string): string {
  const { mode, groomName, brideName } = invitation;

  if (mode === 'syari') {
    return `Assalāmu'alaikum warahmatullāhi wabarakātuh

Dengan memohon rahmat Allāh SWT, kami mengundang Anda ke acara pernikahan:
${groomName} & ${brideName}

${url}`;
  }

  // UNIVERSAL — clean, non-religious
  return `Dengan hormat,

Kami mengundang Anda ke acara pernikahan:
${groomName} & ${brideName}

${url}`;
}
