import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client.
 *
 * Uses the PUBLISHABLE key only. That key is safe to ship to the browser because
 * `public.enquiries` has Row Level Security enabled with a single INSERT policy —
 * it cannot read, update or delete anything. The secret / service-role key must
 * never appear in this file or in any NEXT_PUBLIC_ variable.
 */

export type EnquiryInsert = {
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string | null;
  locale: "en" | "ar";
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let client: SupabaseClient | null = null;

/**
 * Returns the shared client, or null when the environment is not configured.
 * Callers surface a friendly error rather than crashing the page, so a missing
 * key can never take the contact page down.
 */
export function getSupabase(): SupabaseClient | null {
  if (!url || !publishableKey) return null;
  client ??= createClient(url, publishableKey, {
    auth: { persistSession: false },
  });
  return client;
}

export const isSupabaseConfigured = Boolean(url && publishableKey);
