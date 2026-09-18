import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// The real auth check for the admin area. Call at the top of every admin page and server action;
// proxy.ts alone is not enough because it only runs as an early filter.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return { supabase, user };
}
