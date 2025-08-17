import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  const supabase = await createClient();
  const body = await req.json();
  const updatable = (({ title, section_type, content }) => ({
    title,
    section_type,
    content,
  }))(body);

  const { data, error } = await supabase
    .from("post_sections")
    .update(updatable)
    .eq("id", params.sectionId)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _: Request,
  { params }: { params: { sectionId: string } }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("post_sections")
    .delete()
    .eq("id", params.sectionId);
  if (error) {
    // lỗi trigger khi xoá phần cuối cùng
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: "Đã xoá section" });
}
