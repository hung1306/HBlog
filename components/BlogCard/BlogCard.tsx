"use client";

import { Card, Title, Text, Image, Badge } from "@mantine/core";
import Link from "next/link";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    category: string;
    cover_image: string;
    content: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card
      shadow="md"
      radius="md"
      padding="lg"
      withBorder
      className={styles.blogCard}
    >
      {post.cover_image && (
        <div className={styles.imageWrapper}>
          <Image
            src={post.cover_image}
            height={180}
            alt={post.title}
            fit="cover"
            className={styles.coverImg}
          />
        </div>
      )}

      {/* <Badge color="blue" mt="sm" mb="xs" variant="light">
        {post.category}
      </Badge> */}

      <Link href={`/blog/${post.slug}`} className={styles.link}>
        <Title order={3} mt="xs" mb="sm" className={styles.postTitle}>
          {post.title}
        </Title>
      </Link>

      <Text size="sm" color="dimmed" className={styles.contentClamp}>
        {post.content || "Không có mô tả"}
      </Text>
    </Card>
  );
}
