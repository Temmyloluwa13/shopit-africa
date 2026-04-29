import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Routes that require authentication
const PROTECTED_VENDOR_ROUTES = ['/vendor/dashboard'];
const PROTECTED_API_ROUTES = ['/api/orders'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedVendorRoute = PROTECTED_VENDOR_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedVendorRoute && !isProtectedApiRoute) {
    return NextResponse.next();
  }

  // Extract token from cookie or Authorization header
  const cookieToken = request.cookies.get('token')?.value;
  const authHeader = request.headers.get('authorization');
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = cookieToken || headerToken;

  if (!token) {
    if (isProtectedApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Redirect to login for UI routes
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = verifyToken(token);

  if (!payload) {
    if (isProtectedApiRoute) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vendor dashboard requires VENDOR role
  if (isProtectedVendorRoute && payload.role !== 'VENDOR') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/vendor/dashboard/:path*',
    '/api/orders/:path*',
  ],
};
