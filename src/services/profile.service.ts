import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export type Profile = {
  email: string;
  name: string;
  business_name: string;
  id: string;
  phone_number: string;
  onboarding_complete?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProfileUpdate = Partial<Profile>;
export type ProfileCreate = Omit<Profile, 'id'>;

export const createProfile = async (
  data: ProfileCreate,
  user_id: User['id']
) => {
  return await supabase
    .from('profiles')
    .upsert([{ ...data, id: user_id }], { onConflict: 'id' })
    .select();
};

export const updateProfile = async (data: ProfileUpdate, user_id: string) => {
  return await supabase
    .from('profiles')
    .update(data)
    .eq('id', user_id)
    .select();
};
