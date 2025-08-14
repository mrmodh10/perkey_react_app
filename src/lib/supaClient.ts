import axios from 'axios';
import type { SupabaseAuthResponse } from '../types';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL as string;

if (!SUPABASE_FUNCTION_URL) {
  // Fail fast in dev if not configured
  // eslint-disable-next-line no-console
  console.warn('VITE_SUPABASE_FUNCTION_URL is not set');
}

export async function exchangeCodeForSession(code: string): Promise<SupabaseAuthResponse> {
  const res = await axios.post<SupabaseAuthResponse>(
    SUPABASE_FUNCTION_URL,
    { code },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return res.data;
}