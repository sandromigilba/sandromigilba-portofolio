import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  // Check if we are accessing the admin dashboard (but not login)
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') || request.nextUrl.pathname.startsWith('/api/content')) {
    
    // For API routes that modify content, require auth
    if (request.nextUrl.pathname.startsWith('/api/content') && request.method === 'GET') {
       return NextResponse.next(); // allow GET
    }

    const session = request.cookies.get('admin_session');
    if (!session?.value) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Attempt to update session to prolong it
    const res = await updateSession(request);
    if (!res && !request.nextUrl.pathname.startsWith('/api/')) {
       return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return res || NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/content/:path*'],
};
