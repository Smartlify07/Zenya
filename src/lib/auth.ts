import type { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

type AuthResponse = {
  error: AuthError | null;
  session: Session | null;
  user: User | null;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    password,
    email,
  });

  const { session, user } = data;

  return { error, session, user };
};

export const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  const { session, user } = data;

  return { error, session, user };
};

const getURL = () => {
  let url =
    import.meta?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    import.meta?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
};

export const googleAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getURL(),
    },
  });
  return { data, error };
};
