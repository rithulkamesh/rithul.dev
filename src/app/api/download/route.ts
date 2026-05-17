import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { presetsData } from '@/data/presets';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing preset ID', { status: 400 });
  }

  const preset = presetsData.find((p) => p.id === id);

  if (!preset) {
    return new NextResponse('Preset not found', { status: 404 });
  }

  try {
    // Increment the download count for this preset by 1
    // The sorted set is named "preset-downloads"
    await redis.zincrby('preset-downloads', 1, id);
  } catch (error) {
    console.error('Error incrementing download count:', error);
    // Continue anyway so the user still gets the file even if Redis is down
  }

  // Redirect to the actual file URL to start the download
  return NextResponse.redirect(new URL(preset.downloadUrl, request.url));
}
