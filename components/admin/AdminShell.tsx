'use client';
import { AppShell, Burger, Group, NavLink, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="sm" size="sm" />
          <div>Admin Panel</div>
          <Link href="/admin/logout">Đăng xuất</Link>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea style={{ height: '100%' }}>
          <NavLink component={Link} href="/admin" label="Tổng quan" />
          <NavLink component={Link} href="/admin/posts" label="Bài viết" />
          <NavLink component={Link} href="/admin/memories" label="Kỷ niệm (ảnh)" />
          <NavLink component={Link} href="/admin/projects" label="Dự án" />
          <NavLink component={Link} href="/admin/messages" label="Tin nhắn liên hệ" />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
