"use client";
import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  Group
} from "@mantine/core";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <AppShell padding="md">
            {/* Navbar bên trái */}
            <AppShell.Navbar>
              <Group gap="sm" align="stretch">
                <Link href="/admin">Tổng quan</Link>
                <Link href="/admin/posts">Bài viết</Link>
                <Link href="/admin/media">Media</Link>
                <Link href="/admin/settings">Cài đặt</Link>
              </Group>
            </AppShell.Navbar>

            {/* Nội dung chính */}
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
