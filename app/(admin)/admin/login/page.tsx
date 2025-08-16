"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Stack,
  Group,
  Anchor,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = searchParams.get("redirect") || "/admin";
  const supabase = createClient();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      router.replace(next);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Lỗi không xác định");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Paper radius="lg" p="xl" withBorder w={420}>
        <Title order={2} ta="center" mb="md">
          Đăng nhập Admin
        </Title>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              autoComplete="email"
            />
            <PasswordInput
              label="Mật khẩu"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              autoComplete="current-password"
            />

            <Button type="submit" loading={submitting} fullWidth>
              Đăng nhập
            </Button>

            <Group justify="space-between">
              <Anchor size="sm" href="/">
                ← Về trang chủ
              </Anchor>
              <Anchor size="sm" href="#" onClick={(e) => e.preventDefault()}>
                Quên mật khẩu?
              </Anchor>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
