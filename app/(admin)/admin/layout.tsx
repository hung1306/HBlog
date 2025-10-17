"use client";

import "@mantine/core/styles.css";
import {
  MantineProvider,
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "./server-actions";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell header={isLoginPage ? undefined : { height: 60 }}>
        {!isLoginPage && (
          <AppShellHeader>
            <Group px="md" h="100%" justify="space-between">
              <Group gap="md">
                <Text fw={700}>Admin</Text>
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/posts">Bài viết</Link>
                <Link href="/admin/settings">Cài đặt</Link>
              </Group>
              <form action={signOut}>
                <Button type="submit" variant="light">
                  Đăng xuất
                </Button>
              </form>
            </Group>
          </AppShellHeader>
        )}
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </MantineProvider>
  );
}
