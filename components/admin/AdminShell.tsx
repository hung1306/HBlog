'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="flex items-center justify-between bg-white border-b px-4 h-14 fixed top-0 left-0 right-0 z-20">
        {/* Nút Burger */}
        <button
          onClick={() => setOpened(!opened)}
          className="sm:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
        >
          {/* Icon Burger / Close */}
          {opened ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="font-semibold text-lg">Admin Panel</div>

        <Link
          href="/admin/logout"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Đăng xuất
        </Link>
      </header>

      {/* BODY */}
      <div className="flex flex-1 pt-14">
        {/* SIDEBAR */}
        <aside
          className={`fixed sm:static top-14 left-0 w-56 h-[calc(100vh-3.5rem)] bg-white border-r transform transition-transform duration-200 ease-in-out z-10
            ${opened ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
        >
          <nav className="overflow-y-auto h-full p-4 space-y-1">
            <Link
              href="/admin"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Tổng quan
            </Link>
            <Link
              href="/admin/posts"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Bài viết
            </Link>
            <Link
              href="/admin/memories"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Kỷ niệm (ảnh)
            </Link>
            <Link
              href="/admin/projects"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Dự án
            </Link>
            <Link
              href="/admin/messages"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Tin nhắn liên hệ
            </Link>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
