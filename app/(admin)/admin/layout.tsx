"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/global.css"; 
import { signOut } from "./server-actions";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {!isLoginPage && (
          <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6">
              <div className="flex items-center space-x-6">
                <h1 className="font-bold text-lg">Admin</h1>
                <nav className="flex space-x-4 text-sm">
                  <Link
                    href="/admin"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/posts"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Bài viết
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Cài đặt
                  </Link>
                </nav>
              </div>

              <form action={signOut}>
                <button
                  type="submit"
                  className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Đăng xuất
                </button>
              </form>
            </div>
          </header>
        )}

        <main className="flex-1 max-w-7xl mx-auto w-full p-6">{children}</main>

        {!isLoginPage && (
          <footer className="border-t py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </footer>
        )}
      </body>
    </html>
  );
}
