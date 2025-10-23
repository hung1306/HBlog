import BlogCard from "@/components/BlogCard/BlogCard";
import styles from "./blogList.module.css";
import { supabase } from '@/utils/supabaseClient';

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center text-red-600">
        Lỗi tải dữ liệu
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${styles.blogList}`}>
      {/* Tiêu đề trang */}
      {/* <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Blog
      </h1> */}

      {/* Grid hiển thị danh sách bài viết */}
      <div
        className={`grid gap-8 ${styles.listBlogRender} grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}
      >
        {posts?.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
