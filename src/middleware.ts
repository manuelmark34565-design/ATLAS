import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_ROUTES = ['/signin', '/signup', '/', '/privacy', '/pricing', '/api'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_FILE.test(pathname) || PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return;
  }

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('sb-access-token')?.value;

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
