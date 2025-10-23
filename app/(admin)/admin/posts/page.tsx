"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/app/interfaces/post";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminPostsList() {
  const [rows, setRows] = useState<Post[]>([]);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Bài viết</h2>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          Tạo bài mới
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border">Tiêu đề</th>
              <th className="px-4 py-3 border">Slug</th>
              <th className="px-4 py-3 border">Trạng thái</th>
              <th className="px-4 py-3 border">Sections</th>
              <th className="px-4 py-3 border text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3 border">{r.title}</td>
                <td className="px-4 py-3 border">{r.slug}</td>
                <td className="px-4 py-3 border">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md ${
                      r.status === "published"
                        ? "bg-green-100 text-green-700"
                        : r.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 border text-center">
                  {r.section_count}
                </td>
                <td className="px-4 py-3 border text-center">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/posts/${r.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <FaEdit size={16} />
                    </Link>
                    <button
                      onClick={() => remove(r.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xoá"
                    >
                      <FaTrash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!rows.length && !loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-3 text-center text-gray-500 italic"
                >
                  Chưa có bài viết
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-sm">Đang tải dữ liệu...</p>
      )}
    </div>
  );
}
