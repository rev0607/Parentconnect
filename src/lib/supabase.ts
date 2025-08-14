import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Configuration Check:');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);
  throw new Error('Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
    debug: process.env.NODE_ENV === 'development'
  }
});

// Database types
export interface Parent {
  id: string;
  google_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  dob?: string;
  grade: string;
  board: string;
  subjects: string[];
  created_at: string;
}

export interface Preferences {
  id: string;
  parent_id: string;
  language_preference: string;
  notifications_on: boolean;
  whatsapp_on: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  parent_id: string;
  onboarding_step?: string;
  last_login: string;
  created_at: string;
}