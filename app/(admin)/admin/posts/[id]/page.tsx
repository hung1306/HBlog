"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Post } from "../../../../interfaces/post";
import {
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Title,
  Paper,
  Divider,
  Stack,
  Card,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowUp,
  IconArrowDown,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";

type Section = {
  id: string;
  title: string;
  section_type: "intro" | "section" | "conclusion";
  content: string;
  position: number;
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newSec, setNewSec] = useState({
    title: "...",
    section_type: "section",
    content: "",
  });

  // async function load() {
  //   const res = await fetch(`/api/admin/posts/${id}`);
  //   const data = await res.json();
  //   setPost(data.post);
  //   setSections(data.sections);
  // }
  // useEffect(() => {
  //   load();
  // }, [id]);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/posts/${id}`);
    const data = await res.json();
    setPost(data.post);
    setSections(data.sections);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function savePost() {
    setSaving(true);
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    setSaving(false);
    if (!res.ok) alert("Lưu thất bại");
  }

  async function addSection() {
    if (!newSec.title || !newSec.content)
      return alert("Nhập đủ tiêu đề & nội dung");
    setAdding(true);
    const res = await fetch(`/api/admin/posts/${id}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSec),
    });
    setAdding(false);
    if (res.ok) {
      setNewSec({ title: "", section_type: "section", content: "" });
      load();
    } else {
      const e = await res.json();
      alert(e.error || "Thêm thất bại");
    }
  }

  async function updateSection(sec: Section, patch: Partial<Section>) {
    const res = await fetch(`/api/admin/posts/sections/${sec.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...sec, ...patch }),
    });
    if (!res.ok) alert("Cập nhật section thất bại");
  }

  async function deleteSection(sec: Section) {
    if (!confirm("Xoá phần này?")) return;
    const res = await fetch(`/api/admin/posts/sections/${sec.id}`, {
      method: "DELETE",
    });
    if (res.ok) load();
    else {
      const e = await res.json();
      alert(e.error || "Xoá thất bại (có thể bạn đang xoá phần cuối cùng)");
    }
  }

  async function move(sec: Section, dir: "up" | "down") {
    // const idx = sections.findIndex((s) => s.id === sec.id);
    const newPos = dir === "up" ? sec.position - 1 : sec.position + 1;
    if (newPos < 1 || newPos > sections.length) return;
    const res = await fetch(`/api/admin/posts/sections/${sec.id}/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ new_position: newPos }),
    });
    if (res.ok) load();
    else alert("Đổi vị trí thất bại");
  }

  if (!post) return null;

  return (
    <Stack>
      <Paper p="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          Thông tin bài viết
        </Title>
        <TextInput
          label="Tiêu đề"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.currentTarget.value })}
        />
        <TextInput
          mt="sm"
          label="Slug"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.currentTarget.value })}
        />
        <TextInput
          mt="sm"
          label="Category"
          value={post.category ?? ""}
          onChange={(e) =>
            setPost({ ...post, category: e.currentTarget.value })
          }
        />
        <TextInput
          mt="sm"
          label="Cover Image URL"
          value={post.cover_image ?? ""}
          onChange={(e) =>
            setPost({ ...post, cover_image: e.currentTarget.value })
          }
        />
        <Select
          mt="sm"
          label="Trạng thái"
          data={["draft", "published", "archived"]}
          value={post.status}
          onChange={(v) => setPost({ ...post, status: v || "draft" })}
        />
        <Textarea
          mt="sm"
          label="Tóm tắt"
          value={post.summary ?? ""}
          onChange={(e) => setPost({ ...post, summary: e.currentTarget.value })}
        />
        <Group justify="flex-end" mt="md">
          <Button loading={saving} onClick={savePost}>
            Lưu
          </Button>
        </Group>
      </Paper>

      <Divider label="Các phần" labelPosition="center" />

      <Stack>
        {sections.map((sec) => (
          <Card key={sec.id} withBorder shadow="xs">
            <Group justify="space-between">
              <Title order={4}>
                #{sec.position} - {sec.title}
              </Title>
              <Group>
                <Tooltip label="Lên">
                  <ActionIcon onClick={() => move(sec, "up")}>
                    <IconArrowUp size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Xuống">
                  <ActionIcon onClick={() => move(sec, "down")}>
                    <IconArrowDown size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Xoá">
                  <ActionIcon color="red" onClick={() => deleteSection(sec)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>

            <Select
              mt="sm"
              label="Loại phần"
              data={[
                { value: "intro", label: "Mở đầu" },
                { value: "section", label: "Phần nội dung" },
                { value: "conclusion", label: "Kết luận" },
              ]}
              value={sec.section_type}
              onChange={(v) => {
                if (v) {
                  const value = v as Section["section_type"];
                  updateSection(sec, { section_type: value });
                  sec.section_type = value;
                  setSections([...sections]);
                }
              }}
            />

            <TextInput
              mt="sm"
              label="Tiêu đề phần"
              value={sec.title}
              onChange={(e) => {
                sec.title = e.currentTarget.value;
                setSections([...sections]);
              }}
              onBlur={() => updateSection(sec, { title: sec.title })}
            />

            <Textarea
              mt="sm"
              label="Nội dung"
              minRows={8}
              value={sec.content}
              onChange={(e) => {
                sec.content = e.currentTarget.value;
                setSections([...sections]);
              }}
              onBlur={() => updateSection(sec, { content: sec.content })}
            />
          </Card>
        ))}
      </Stack>

      <Paper p="lg" radius="md" withBorder>
        <Title order={4} mb="sm">
          Thêm phần mới
        </Title>
        <TextInput
          label="Tiêu đề"
          value={newSec.title}
          onChange={(e) =>
            setNewSec({ ...newSec, title: e.currentTarget.value })
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
          value={newSec.section_type}
          onChange={(v) =>
            setNewSec({
              ...newSec,
              section_type: (v as Section["section_type"]) || "section",
            })
          }
        />
        <Textarea
          mt="sm"
          label="Nội dung"
          minRows={6}
          value={newSec.content}
          onChange={(e) =>
            setNewSec({ ...newSec, content: e.currentTarget.value })
          }
        />
        <Group justify="flex-end" mt="md">
          <Button
            leftSection={<IconPlus size={16} />}
            loading={adding}
            onClick={addSection}
          >
            Thêm phần
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
}
