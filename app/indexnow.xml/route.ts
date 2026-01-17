import { NextResponse } from 'next/server';

// IndexNow API Key - Generar uno en https://www.bing.com/indexnow
const INDEXNOW_KEY = '3f4a8e7b9c2d1f6e8a5b3c9d2e7f4a8b';

export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
