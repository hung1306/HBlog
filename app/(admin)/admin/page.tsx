// src/app/(admin)/admin/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminHome() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/admin/login");

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (adminEmail && data.user.email !== adminEmail) redirect("/");

  return (
    <div>
      <h3>Chào {data.user.email}</h3>
      <p>Đây là bảng điều khiển Admin.</p>
    </div>
  );
}
