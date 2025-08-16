// src/app/(admin)/admin/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Title, Card, Text } from "@mantine/core";

export default async function AdminHome() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/admin/login");

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (adminEmail && data.user.email !== adminEmail) redirect("/");

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2}>Chào {data.user.email}</Title>
      <Text c="dimmed" mt="sm">
        Đây là bảng điều khiển Admin.
      </Text>
    </Card>
  );
}
