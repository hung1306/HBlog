export interface PostSection {
  count: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  post_sections: PostSection[];
  section_count?: number;
}