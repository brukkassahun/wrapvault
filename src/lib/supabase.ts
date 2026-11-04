import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createSafeClient(): SupabaseClient {
  if (!url || !anonKey || anonKey === "your_anon_key_here") {
    return new Proxy({} as SupabaseClient, {
      get() {
        return () => ({
          data: null,
          error: { message: "Supabase not configured" },
          count: 0,
        });
      },
    });
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

export const supabase = createSafeClient();
export const isSupabaseConfigured = Boolean(url && anonKey && anonKey !== "your_anon_key_here");
