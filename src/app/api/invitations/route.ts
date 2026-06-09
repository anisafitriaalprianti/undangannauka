import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

/** POST /api/invitations — Create or update an invitation */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, groomName, brideName, date, time, location, personalMessage, template, mode } = body;

    if (!slug || !groomName || !brideName) {
      return NextResponse.json(
        { error: 'slug, groomName, dan brideName wajib diisi' },
        { status: 400 }
      );
    }

    // Upsert: create if not exists, update if exists
    const invitation = await db.invitation.upsert({
      where: { slug },
      create: {
        slug,
        groomName,
        brideName,
        date: date || '',
        time: time || '',
        location: location || '',
        personalMessage: personalMessage || '',
        template: template || 'basic-calm',
        mode: mode || 'universal',
      },
      update: {
        groomName,
        brideName,
        date: date || '',
        time: time || '',
        location: location || '',
        personalMessage: personalMessage || '',
        template: template || 'basic-calm',
        mode: mode || 'universal',
      },
    });

    return NextResponse.json({ success: true, invitation });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    console.error('POST /api/invitations error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** GET /api/invitations — List all invitations */
export async function GET() {
  try {
    const invitations = await db.invitation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ invitations });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    console.error('GET /api/invitations error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
