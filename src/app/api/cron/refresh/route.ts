// src/app/api/cron/refresh/route.ts
// Vercel Cron calls this every 6 hours to warm the cache

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Verify it's called from Vercel Cron
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Trigger a revalidation of the players API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await fetch(`${baseUrl}/api/players`, { cache: 'no-store' });

    return NextResponse.json({ success: true, refreshedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
