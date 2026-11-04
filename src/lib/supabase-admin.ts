import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createAdminClient(): SupabaseClient {
  if (!url || !serviceKey || serviceKey === "your_service_role_key_here") {
    return new Proxy({} as SupabaseClient, {
      get() {
        return () => ({
          data: null,
          error: { message: "Supabase admin not configured" },
          count: 0,
        });
      },
    });
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const supabaseAdmin = createAdminClient();
