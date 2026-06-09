import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

/** GET /api/invitations/[slug] — Get a single invitation by slug */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const invitation = await db.invitation.findUnique({
      where: { slug },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Undangan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ invitation });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    console.error('GET /api/invitations/[slug] error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE /api/invitations/[slug] — Delete an invitation by slug */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await db.invitation.delete({
      where: { slug },
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    console.error('DELETE /api/invitations/[slug] error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
