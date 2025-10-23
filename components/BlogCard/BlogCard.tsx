"use client";

import Link from "next/link";

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    category?: string;
    cover_image?: string;
    content?: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
      {/* Ảnh bìa */}
      {post.cover_image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Nội dung */}
      <div className="p-5 flex flex-col h-full">
        {/* Category Badge */}
        {post.category && (
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md mb-3 w-fit">
            {post.category}
          </span>
        )}

        {/* Tiêu đề bài viết */}
        <Link
          href={`/blog/${post.slug}`}
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 transition-colors mb-2 line-clamp-2"
        >
          {post.title}
        </Link>

        {/* Nội dung mô tả */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {post.content || "Không có mô tả"}
        </p>
      </div>
    </div>
  );
}
