import type { Client, SupabaseFetchResult } from '@/types';
import type { User } from '@supabase/supabase-js';
import { createData, fetchData } from './call-api';

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

export const createClient = async (
  clientData: Omit<Client, 'id'>,
  user_id: User['id']
) => {
  return createData('clients', clientData, user_id);
};
