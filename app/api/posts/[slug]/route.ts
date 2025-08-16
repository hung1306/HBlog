import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("posts")
    .update(body)
    .eq("slug", slug)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const { error } = await supabase.from("posts").delete().eq("slug", slug);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Deleted successfully" });
}
