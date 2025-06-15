import { supabase } from '@/lib/supabase';
import type { Client, SupabaseFetchResult } from '@/types';
import type { PostgrestResponse, User } from '@supabase/supabase-js';
import { fetchData } from './call-api';

export const fetchClients = async (
  user_id: string
): Promise<SupabaseFetchResult<Client[]>> => {
  return fetchData({
    table: 'clients',
    joins: ['tasks', 'projects'],
    filters: {
      user_id,
    },
    single: false,
    order: true,
  });
};

export const fetchClientById = async (
  id: string,
  user_id: string
): Promise<SupabaseFetchResult<Client>> => {
  if (!id) {
    return { data: null, error: 'No client found with the specified id' };
  }
  return fetchData({
    table: 'clients',
    joins: ['tasks', 'projects'],
    filters: {
      user_id,
      id,
    },
    single: true,
    order: true,
  });
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
