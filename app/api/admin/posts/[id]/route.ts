import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, summary, category, cover_image, status, created_at, updated_at"
    )
    .eq("id", params.id)
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  const { data: sections, error: secErr } = await supabase
    .from("post_sections")
    .select("id, title, section_type, content, position, created_at")
    .eq("post_id", params.id)
    .order("position", { ascending: true });
  if (secErr)
    return NextResponse.json({ error: secErr.message }, { status: 500 });

  return NextResponse.json({ post, sections });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const body = await req.json();

  const updatable = (({
    title,
    slug,
    summary,
    category,
    cover_image,
    status,
  }) => ({ title, slug, summary, category, cover_image, status }))(body);

  const { data, error } = await supabase
    .from("posts")
    .update(updatable)
    .eq("id", params.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Đã xoá bài viết" });
}
