/**
 * DriveHub — Supabase client (PLACEHOLDER, not wired yet)
 * ------------------------------------------------------
 * The app currently runs 100% on demo data in `src/data/`.
 * When the backend is enabled (see BACKEND-SETUP.md):
 *
 *   1. npm install @supabase/supabase-js   (already in package.json)
 *   2. Create a Supabase project and run `supabase/schema.sql`
 *   3. Add to .env.local:
 *        NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
 *        NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
 *   4. Replace the demo-data imports page by page with queries
 *      against this client.
 *
 * This module is intentionally safe to import today: if the env
 * vars are missing it exports `null` instead of throwing, so the
 * demo build never breaks.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isBackendEnabled = supabase !== null;
