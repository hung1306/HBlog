import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  const supabase = await createClient();
  const body = await req.json();
  const { new_position } = body;

  if (!new_position || new_position < 1) {
    return NextResponse.json(
      { error: "new_position phải >= 1" },
      { status: 400 }
    );
  }

  const { error } = await supabase.rpc("reorder_section", {
    p_section_id: params.sectionId,
    p_new_position: new_position,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
