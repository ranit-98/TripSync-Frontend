import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_CONTENT_TYPES = new Set([
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/csv',
  'text/plain',
  'text/html',
  'text/markdown',
  'application/json',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'application/octet-stream',
]);

const getSafeFileName = (value: string | null) => {
  const fileName = value?.trim() || 'document';

  return fileName.replace(/[^\w.\- ()]/g, '_').slice(0, 160);
};

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const fileName = getSafeFileName(request.nextUrl.searchParams.get('filename'));
  const contentTypeOverride = request.nextUrl.searchParams.get('type');

  if (!url) {
    return new Response('Missing document URL.', { status: 400 });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    return new Response('Invalid document URL.', { status: 400 });
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return new Response('Unsupported document URL.', { status: 400 });
  }

  try {
    const range = request.headers.get('range');
    const upstream = await fetch(parsedUrl.toString(), {
      cache: 'no-store',
      headers: {
        Accept: '*/*',
        ...(range ? { Range: range } : {}),
        'User-Agent': 'Mozilla/5.0 (compatible; TripSync/1.0)',
      },
    });

    if (!upstream.ok) {
      return new Response('Unable to load document.', { status: upstream.status });
    }

    // Resolve the final content type
    const upstreamType = upstream.headers.get('content-type')?.split(';')[0]?.trim() || 'application/octet-stream';
    const contentType = contentTypeOverride || upstreamType;

    // Only allow known document/media types to prevent abuse
    const baseType = contentType.split(';')[0].trim();
    const isAllowed = ALLOWED_CONTENT_TYPES.has(baseType) || baseType.startsWith('image/') || baseType.startsWith('video/') || baseType.startsWith('text/');

    if (!isAllowed) {
      return new Response('Document type not supported for preview.', { status: 415 });
    }

    // Stream the response body directly – avoids buffering the entire file in memory
    const body = upstream.body;

    if (!body) {
      return new Response('Empty document body.', { status: 502 });
    }

    const upstreamLength = upstream.headers.get('content-length');

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'private, max-age=300',
      'Content-Disposition': `inline; filename="${fileName}"`,
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
    };

    if (upstreamLength) {
      headers['Content-Length'] = upstreamLength;
    }

    const acceptRanges = upstream.headers.get('accept-ranges');
    const contentRange = upstream.headers.get('content-range');

    if (acceptRanges) {
      headers['Accept-Ranges'] = acceptRanges;
    }

    if (contentRange) {
      headers['Content-Range'] = contentRange;
    }

    return new Response(body, { headers, status: upstream.status });
  } catch {
    return new Response('Unable to load document.', { status: 502 });
  }
}
