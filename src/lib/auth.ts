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
