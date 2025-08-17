import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Post } from "@/app/interfaces/post";

export async function GET() {
  const supabase = await createClient();

  // Lấy danh sách post của chính admin + đếm sections
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, status, created_at, updated_at, post_sections(count)"
    )
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  // Chuyển count cho tiện
  const normalized = data.map((p: Post) => ({
    ...p,
    section_count:
      (Array.isArray(p.post_sections) && p.post_sections[0]?.count) ?? 0,
  }));
  return NextResponse.json(normalized);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title,
    slug,
    summary,
    category,
    cover_image,
    status = "draft",
    first_section_title,
    first_section_type = "intro",
    first_section_content,
  } = body;

  if (!title || !slug || !first_section_title || !first_section_content) {
    return NextResponse.json(
      { error: "Thiếu trường bắt buộc" },
      { status: 400 }
    );
  }

  // RPC transactional: tạo post + section đầu tiên
  const { data, error } = await supabase.rpc("create_post_with_section", {
    p_author_id: userData.user.id,
    p_title: title,
    p_slug: slug,
    p_summary: summary ?? null,
    p_category: category ?? null,
    p_cover_image: cover_image ?? null,
    p_status: status,
    p_section_title: first_section_title,
    p_section_type: first_section_type,
    p_content: first_section_content,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: data }, { status: 201 });
}
