import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.AUTH_SECRET || 'simplehearing_super_secret_jwt_key_2026_secured';
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_session')?.value;

  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, encodedKey, { algorithms: ['HS256'] });
      isValid = true;
    } catch (err) {
      isValid = false;
    }
  }

  // If user is logged in and visits /login, redirect to /admin/dashboard
  if (pathname === '/login' && isValid) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Protected admin web pages
  if (pathname.startsWith('/admin')) {
    if (!isValid) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protected admin API endpoints
  if (pathname.startsWith('/api/admin')) {
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/login'],
};
