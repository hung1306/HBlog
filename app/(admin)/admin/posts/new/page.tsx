"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Title,
  Paper,
  Grid,
} from "@mantine/core";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    category: "",
    cover_image: "",
    status: "draft",
    first_section_title: "Mở đầu",
    first_section_type: "intro",
    first_section_content: "",
  });
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      const { id } = await res.json();
      router.replace(`/admin/posts/${id}`);
    } else {
      alert("Tạo bài thất bại");
    }
  }

  return (
    <Paper p="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        Tạo bài viết
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Tiêu đề"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.currentTarget.value })}
          />
          <TextInput
            mt="sm"
            label="Slug"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.currentTarget.value })}
          />
          <TextInput
            mt="sm"
            label="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.currentTarget.value })
            }
          />
          <TextInput
            mt="sm"
            label="Cover Image URL"
            value={form.cover_image}
            onChange={(e) =>
              setForm({ ...form, cover_image: e.currentTarget.value })
            }
          />
          <Select
            mt="sm"
            label="Trạng thái"
            data={["draft", "published", "archived"]}
            value={form.status}
            onChange={(v) => setForm({ ...form, status: v || "draft" })}
          />
          <Textarea
            mt="sm"
            label="Tóm tắt"
            minRows={3}
            value={form.summary}
            onChange={(e) =>
              setForm({ ...form, summary: e.currentTarget.value })
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={4} mb="xs">
            Phần đầu tiên
          </Title>
          <TextInput
            label="Tiêu đề phần"
            required
            value={form.first_section_title}
            onChange={(e) =>
              setForm({ ...form, first_section_title: e.currentTarget.value })
            }
          />
          <Select
            mt="sm"
            label="Loại phần"
            data={[
              { value: "intro", label: "Mở đầu" },
              { value: "section", label: "Phần nội dung" },
              { value: "conclusion", label: "Kết luận" },
            ]}
            value={form.first_section_type}
            onChange={(v) =>
              setForm({ ...form, first_section_type: v || "intro" })
            }
          />
          <Textarea
            mt="sm"
            label="Nội dung (Markdown/HTML)"
            minRows={10}
            value={form.first_section_content}
            onChange={(e) =>
              setForm({ ...form, first_section_content: e.currentTarget.value })
            }
          />
        </Grid.Col>
      </Grid>

      <Group mt="lg" justify="flex-end">
        <Button loading={loading} onClick={submit}>
          Tạo bài
        </Button>
      </Group>
    </Paper>
  );
}
