import { Container, Title, SimpleGrid } from "@mantine/core";
import BlogCard from "@/components/BlogCard/BlogCard";
import styles from "./blogList.module.css";

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <Container>Lỗi tải dữ liệu</Container>;
  }

  return (
    <Container size="lg" py="xl" className={styles.blogList}>
      {/* <Title order={1} mb="xl" className={styles.pageTitle}>
        Blog
      </Title> */}

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="lg"
        className={styles.listBlogRender}
      >
        {posts?.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
