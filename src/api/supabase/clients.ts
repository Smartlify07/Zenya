import { supabase } from '@/lib/supabase';
import type { Client } from '@/types';
import type { PostgrestResponse, User } from '@supabase/supabase-js';

export const fetchClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const fetchClientById = async (id: string, user_id: string) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('user_id', user_id)
    .single();
  return { data, error };
};

export const fetchClientsByIds = async (
  clientIds: string[],
  userId: string
): Promise<{
  data: Client[] | null;
  error: PostgrestResponse<Client>['error'];
}> => {
  if (!clientIds || clientIds.length === 0) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .in('id', clientIds)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching clients by IDs:', error);
    return { data: null, error };
  }

  return { data: data as Client[], error: null };
};

export const createClient = async (
  clientData: Omit<Client, 'id'>,
  user_id: User['id']
) => {
  const { data, error } = await supabase
    .from('clients')
    .insert({ ...clientData, user_id });

  if (error) {
    console.error(error);
    throw error;
  }
  return { data, error };
};
