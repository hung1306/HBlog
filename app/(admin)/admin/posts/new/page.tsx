"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Tạo bài viết</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Ảnh bìa (URL)
            </label>
            <input
              type="text"
              value={form.cover_image}
              onChange={(e) =>
                setForm({ ...form, cover_image: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring focus:ring-blue-200"
            >
              <option value="draft">Nháp</option>
              <option value="published">Đã xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tóm tắt</label>
            <textarea
              rows={4}
              value={form.summary}
              onChange={(e) =>
                setForm({ ...form, summary: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
        </div>

        {/* Cột phải */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Phần đầu tiên</h4>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tiêu đề phần *
            </label>
            <input
              type="text"
              value={form.first_section_title}
              onChange={(e) =>
                setForm({
                  ...form,
                  first_section_title: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Loại phần</label>
            <select
              value={form.first_section_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  first_section_type: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring focus:ring-blue-200"
            >
              <option value="intro">Mở đầu</option>
              <option value="section">Phần nội dung</option>
              <option value="conclusion">Kết luận</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nội dung (Markdown/HTML)
            </label>
            <textarea
              rows={10}
              value={form.first_section_content}
              onChange={(e) =>
                setForm({
                  ...form,
                  first_section_content: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={submit}
          disabled={loading}
          className={`px-5 py-2 rounded-lg font-medium text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang tạo..." : "Tạo bài viết"}
        </button>
      </div>
    </div>
  );
}
