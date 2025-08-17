import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const body = await req.json();
  const { title, section_type = "section", content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Thiếu title/content" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("add_section", {
    p_post_id: params.id,
    p_title: title,
    p_section_type: section_type,
    p_content: content,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data }, { status: 201 });
}
