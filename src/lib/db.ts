/**
 * NAUKA PRODUCTION: Supabase Database — Single Source of Truth
 *
 * 🔥 ALL data lives in Supabase. No localStorage for guests/RSVPs.
 * - supabase client from ./supabase (SupabaseClient | null)
 * - If supabase is null (ENV missing) → functions return null/false/[] with console error
 * - saveGuestsToDB THROWS if ENV missing (critical operation)
 *
 * 🏗️ SUPABASE TABLE SCHEMA:
 *
 * CREATE TABLE invitations (
 *   slug       TEXT PRIMARY KEY,
 *   data       JSONB NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * CREATE TABLE guests (
 *   id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   slug       TEXT NOT NULL,
 *   name       TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   UNIQUE(slug, name)
 * );
 *
 * CREATE INDEX idx_guests_slug ON guests(slug);
 *
 * CREATE TABLE rsvps (
 *   id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   slug       TEXT NOT NULL,
 *   guest_name TEXT NOT NULL,
 *   status     TEXT NOT NULL CHECK (status IN ('hadir', 'tidak')),
 *   rsvp_time  TIMESTAMPTZ DEFAULT NOW(),
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   UNIQUE(slug, guest_name)
 * );
 *
 * CREATE INDEX idx_rsvps_slug ON rsvps(slug);
 *
 * -- Enable Realtime
 * ALTER PUBLICATION supabase_realtime ADD TABLE rsvps;
 * ALTER PUBLICATION supabase_realtime ADD TABLE guests;
 */

import { supabase, isSupabaseConfigured } from './supabase';
import type { RSVPStatus, InvitationData } from './invitation';

/* =========================
   TYPES
========================= */

export interface GuestRow {
  id?: string;
  slug: string;
  name: string;
  created_at?: string;
}

export interface RSVPRow {
  id?: string;
  slug: string;
  guest_name: string;
  status: RSVPStatus;
  rsvp_time: string;
  created_at?: string;
}

export interface RSVPStats {
  totalGuests: number;
  hadir: number;
  tidak: number;
  belum: number;
}

/* =========================
   INVITATIONS
========================= */

/** Save invitation data to Supabase */
export async function saveInvitationToDB(slug: string, data: InvitationData): Promise<boolean> {
  if (!supabase) {
    console.error('[DB] ENV Supabase tidak terbaca di frontend — saveInvitationToDB gagal');
    return false;
  }

  try {
    const { error } = await supabase
      .from('invitations')
      .upsert({ slug, data }, { onConflict: 'slug' });

    if (error) {
      console.error('[DB] Save invitation error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[DB] Save invitation failed:', err instanceof Error ? err.message : err);
    return false;
  }
}

/** Get invitation from Supabase */
export async function getInvitationFromDB(slug: string): Promise<InvitationData | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('invitations')
    .select('data')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data.data as InvitationData;
}

/** List all invitations from Supabase */
export async function listInvitationsFromDB(): Promise<{ slug: string; data: InvitationData }[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('invitations')
    .select('slug, data')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('[DB] List invitations error:', error?.message);
    return [];
  }

  return data.map((row) => ({
    slug: row.slug,
    data: row.data as InvitationData,
  }));
}

/* =========================
   GUESTS
========================= */

/** Save a list of guests to Supabase (batch upsert) — THROWS if ENV missing */
export async function saveGuestsToDB(slug: string, guestList: string[]): Promise<GuestRow[]> {
  if (!supabase) {
    throw new Error(
      'ENV Supabase tidak terbaca di frontend. ' +
      'Pastikan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah di-set di Vercel → Settings → Environment Variables → Redeploy.'
    );
  }

  const rows = guestList.map((name) => ({
    slug,
    name: name.trim(),
  }));

  const { data, error } = await supabase
    .from('guests')
    .upsert(rows, { onConflict: 'slug,name' })
    .select();

  if (error) {
    throw new Error(`Gagal menyimpan tamu ke Supabase: ${error.message}`);
  }

  return (data as GuestRow[]) || [];
}

/** Get all guests for an invitation from Supabase */
export async function getGuestsFromDB(slug: string): Promise<GuestRow[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[DB] Get guests error:', error.message);
    return null;
  }

  return data as GuestRow[];
}

/** Delete a guest from Supabase */
export async function deleteGuestFromDB(slug: string, name: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('slug', slug)
    .eq('name', name);

  if (error) {
    console.error('[DB] Delete guest error:', error.message);
    return false;
  }

  return true;
}

/* =========================
   RSVPS (SEPARATE TABLE)
========================= */

/** Save RSVP to Supabase */
export async function saveRSVPToDB(slug: string, guestName: string, status: RSVPStatus): Promise<boolean> {
  if (!supabase) {
    console.error('[DB] ENV Supabase tidak terbaca di frontend — saveRSVPToDB gagal');
    return false;
  }

  try {
    const { error } = await supabase
      .from('rsvps')
      .upsert({
        slug,
        guest_name: guestName,
        status,
        rsvp_time: new Date().toISOString(),
      }, { onConflict: 'slug,guest_name' });

    if (error) {
      console.error('[DB] Save RSVP error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[DB] Save RSVP failed:', err instanceof Error ? err.message : err);
    return false;
  }
}

/** Get a single guest's RSVP from Supabase */
export async function getRSVPFromDB(slug: string, guestName: string): Promise<RSVPRow | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .eq('slug', slug)
    .eq('guest_name', guestName)
    .single();

  if (error || !data) {
    return null;
  }

  return data as RSVPRow;
}

/** Get all RSVPs for an invitation from Supabase */
export async function getAllRSVPsFromDB(slug: string): Promise<RSVPRow[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .eq('slug', slug)
    .order('rsvp_time', { ascending: false });

  if (error) {
    console.error('[DB] Get all RSVPs error:', error.message);
    return null;
  }

  return data as RSVPRow[];
}

/** Get RSVP stats: total guests, hadir, tidak, belum */
export async function getRSVPStatsFromDB(slug: string): Promise<RSVPStats | null> {
  if (!supabase) return null;

  const { data: guests, error: gErr } = await supabase
    .from('guests')
    .select('name')
    .eq('slug', slug);

  if (gErr) {
    console.error('[DB] Get RSVP stats (guests) error:', gErr.message);
    return null;
  }

  const { data: rsvps, error: rErr } = await supabase
    .from('rsvps')
    .select('status')
    .eq('slug', slug);

  if (rErr) {
    console.error('[DB] Get RSVP stats (rsvps) error:', rErr.message);
    return null;
  }

  const totalGuests = guests?.length || 0;
  const hadir = rsvps?.filter((r) => r.status === 'hadir').length || 0;
  const tidak = rsvps?.filter((r) => r.status === 'tidak').length || 0;
  const belum = totalGuests - hadir - tidak;

  return { totalGuests, hadir, tidak, belum };
}

/* =========================
   REALTIME SUBSCRIPTION
========================= */

/** Subscribe to realtime changes for an invitation (both guests & rsvps) */
export function subscribeToRSVPs(
  slug: string,
  onUpdate: () => void
): (() => void) | null {
  if (!supabase) return null;

  const channel = supabase
    .channel(`rsvp-${slug}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'rsvps',
        filter: `slug=eq.${slug}`,
      },
      () => onUpdate()
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'guests',
        filter: `slug=eq.${slug}`,
      },
      () => onUpdate()
    )
    .subscribe();

  return () => {
    supabase!.removeChannel(channel);
  };
}

export { isSupabaseConfigured };
