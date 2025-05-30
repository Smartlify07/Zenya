import { supabase } from './supabase';

export const joinWaitlist = async (email: string) => {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([
      {
        email: email,
      },
    ])
    .select();

  return { data, error };
};
