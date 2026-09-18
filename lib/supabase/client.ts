import { createBrowserClient } from "@supabase/ssr";

// For Client Components (used by the Phase 4 admin: login, uploads).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
