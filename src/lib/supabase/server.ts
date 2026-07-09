import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

type CookieOptions = {
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
  maxAge?: number;
  expires?: string | Date;
};

const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
};

const setCookie = async (
  name: string,
  value: string,
  options: CookieOptions
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    path: options.path,
    domain: options.domain,
    secure: options.secure,
    httpOnly: options.httpOnly,
    sameSite: options.sameSite,
    maxAge: options.maxAge,
    expires:
      typeof options.expires === 'string' ? new Date(options.expires) : options.expires,
  });
};

const removeCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing required environment variables SUPABASE_URL or SUPABASE_ANON_KEY.'
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: getCookie,
      set: setCookie,
      remove: removeCookie,
    },
  });
};
