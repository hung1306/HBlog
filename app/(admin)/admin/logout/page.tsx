"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Center, Loader, Text } from "@mantine/core";
import { createSupabaseBrowser } from "@/utils/supabaseClient";

export default function AdminLogout() {
  const supabase = createSupabaseBrowser();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      router.replace("/admin/login");
    })();
  }, [router, supabase]);

  return (
    <Center h={200} style={{ flexDirection: "column" }}>
      <Loader />
      <Text mt="sm">Đang đăng xuất…</Text>
    </Center>
  );
}
