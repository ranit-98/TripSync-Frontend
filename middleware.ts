import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/auth/register', '/cms'];
const ACCESS_COOKIE = 'trip_sync_access';

const isSafeInternalPath = (path: string | null): path is string => {
  return Boolean(path?.startsWith('/') && !path.startsWith('//'));
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const hasAccessToken = Boolean(request.cookies.get(ACCESS_COOKIE)?.value);

  if (!hasAccessToken && !isPublic) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasAccessToken && (pathname === '/login' || pathname === '/auth/register')) {
    const nextPath = request.nextUrl.searchParams.get('next');

    if (isSafeInternalPath(nextPath)) {
      return NextResponse.redirect(new URL(nextPath, request.url));
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
