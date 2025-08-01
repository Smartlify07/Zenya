import { supabase } from '@/lib/supabase';

export const signUpWithEmail = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signUp({ email, password });
  return { error, data };
};
