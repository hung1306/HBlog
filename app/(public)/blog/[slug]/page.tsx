import { supabase } from "@/utils/supabaseClient";
import { Container, Title, Text, Badge, Image, Divider } from "@mantine/core";
import styles from "./blogDetail.module.css";

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    return <Container>Không tìm thấy bài viết</Container>;
  }

  return (
    <Container size="md" py="xl" className={styles.blogDetail}>
      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt={post.title}
          height={260}
          radius="md"
          className={styles.coverImg}
          mb="lg"
        />
      )}
      <Title order={1} mb="xs" className={styles.title}>
        {post.title}
      </Title>
      <Badge className={styles.categoryBadge} mb="xs">
        {post.category}
      </Badge>
      <Text size="sm" color="dimmed" mb="sm">
        {new Date(post.created_at).toLocaleDateString("vi-VN")}
      </Text>
      <Divider mb="md" />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}
