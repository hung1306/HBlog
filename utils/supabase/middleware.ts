// src/utils/supabase/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  const url = request.nextUrl.clone();
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  // BẮT BUỘC: dùng getUser() để revalidate token (không dùng getSession trong middleware)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminPath = url.pathname.startsWith("/admin");
  const isLoginPath = url.pathname === "/admin/login";
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  // Nếu đã login mà vào /admin/login -> chuyển về dashboard cho admin
  if (isLoginPath && user) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
  // Nếu vào /admin (trừ /admin/login) mà chưa login -> đẩy sang login
  if (isAdminPath && !isLoginPath) {
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", url.pathname + url.search);
      return NextResponse.redirect(loginUrl);
    }
    // Nếu login nhưng không đúng admin email -> về trang chủ
    if (adminEmail && user.email !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return response;
}
