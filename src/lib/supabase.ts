import { createClient } from '@supabase/supabase-js';

// Ces variables iront chercher les clés dans ton fichier .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Attention : Les clés Supabase sont manquantes dans le fichier .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
