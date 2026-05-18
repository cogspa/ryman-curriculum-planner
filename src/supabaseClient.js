import { createClient } from '@supabase/supabase-js';

// Netlify's Supabase Integration will automatically inject these variables
// into your build environment.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if the environment variables exist
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;
