// src/middleware.ts
import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Giảm overhead: chỉ áp cho /admin/* và /admin/login
export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};
