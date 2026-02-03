import type { Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';
import { supabaseAnonKey, supabaseUrl } from '../config';

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      '@supabase/ssr: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required!'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
