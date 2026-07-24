import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

let client = null;

if (isValidUrl(supabaseUrl) && supabaseKey) {
  try {
    client = createClient(supabaseUrl, supabaseKey);
  } catch (e) {
    console.warn('[SupabaseClient] Initialization failed, falling back to local mode:', e);
    client = null;
  }
}

export const supabase = client;
