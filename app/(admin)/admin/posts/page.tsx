"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Group,
  Badge,
  Title,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function AdminPostsList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/posts");
    const data = await res.json();
    setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Xoá bài viết?")) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Bài viết</Title>
        <Button component={Link} href="/admin/posts/new">
          Tạo bài mới
        </Button>
      </Group>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Tiêu đề</Table.Th>
            <Table.Th>Slug</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>#Sections</Table.Th>
            <Table.Th>Thao tác</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((r) => (
            <Table.Tr key={r.id}>
              <Table.Td>{r.title}</Table.Td>
              <Table.Td>{r.slug}</Table.Td>
              <Table.Td>
                <Badge
                  color={
                    r.status === "published"
                      ? "green"
                      : r.status === "draft"
                      ? "yellow"
                      : "gray"
                  }
                >
                  {r.status}
                </Badge>
              </Table.Td>
              <Table.Td>{r.section_count}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Tooltip label="Sửa">
                    <ActionIcon
                      component={Link}
                      href={`/admin/posts/${r.id}`}
                      variant="light"
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Xoá">
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => remove(r.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
          {!rows.length && !loading && (
            <Table.Tr>
              <Table.Td colSpan={5}>Chưa có bài viết</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </>
  );
}
