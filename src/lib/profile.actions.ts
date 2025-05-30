import { supabase } from './supabase';

type Profile = {
  id?: string;
  businessName: string;
  logo_url?: string;
  contactEmail: string;
  phone_number: string;
  onboarding_complete: boolean;
};
export const createProfile = async (
  profileData: Profile,
  user_id: string | undefined
) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        business_name: profileData.businessName,
        user_id,
        phone_number: profileData.phone_number,
      },
    ])
    .select('*');

  if (error) {
    return error.message;
  }
  return data;
};

export const updateProfile = async (
  profileData: Partial<Profile>,
  user_id: string | undefined
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      business_name: profileData.businessName,
      onboarding_complete: profileData?.onboarding_complete,
    })
    .eq('id', user_id)
    .select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
