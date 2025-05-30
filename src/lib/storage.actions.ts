import { supabase } from './supabase';

export const getBucketItems = async (bucket: string) => {
  const { data, error } = await supabase.storage.getBucket(bucket);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
