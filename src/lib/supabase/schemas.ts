import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

export type AppSupabaseClient = SupabaseClient<Database>;

export function core(client: AppSupabaseClient) {
  return client.schema("core");
}

export function echoes(client: AppSupabaseClient) {
  return client.schema("echoes");
}
