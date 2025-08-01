import { supabase } from '@/lib/supabase';
import type { Client } from '@/types';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type CreateClientData = Omit<Client, 'id'>;
type CreateClientVariables = {
  newClient: CreateClientData;
  user_id: User['id'];
};

const createClient = async (data: CreateClientData, user_id: User['id']) => {
  const { data: clients, error } = await supabase
    .from('clients')
    .insert({ ...data, user_id })
    .select();

  if (error) {
    throw error;
  }

  return clients;
};

const getClients = async () => {
  const { data: clients, error } = await supabase.from('clients').select('*');
  if (error) {
    throw error;
  }
  return clients;
};

const deleteClient = async (client_id: Client['id']) => {
  const { data, error } = await supabase
    .from('clients')
    .delete()
    .eq('id', client_id);
  if (error) {
    throw error;
  }
  return data;
};

export const useGetClients = () =>
  useQuery({ queryFn: getClients, queryKey: ['clients'] });

export const useCreateClient = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ newClient, user_id }: CreateClientVariables) => {
      return createClient(newClient, user_id);
    },

    onMutate: async ({ newClient }: CreateClientVariables) => {
      await query.cancelQueries({ queryKey: ['clients'] });

      const previousClients = query.getQueryData(['clients']);

      query.setQueryData(['clients'], (old: Client[]) => {
        if (!old) {
          return [newClient];
        }
        return [...old, newClient];
      });

      return { previousClients };
    },

    onError: (err, __, context) => {
      query.setQueryData(['clients'], context?.previousClients);
      console.error('Error from Supabase:', err);
      throw new Error(
        `Failed to create client: ${err.message || 'Unknown error'}`
      );
    },

    onSettled: (_, error) => {
      if (error) {
        console.error(error);
      }
      query.invalidateQueries({
        queryKey: ['clients'],
      });
    },
  });
};

export const useDeleteClient = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onMutate: async (client_id: Client['id']) => {
      await query.cancelQueries({ queryKey: ['clients'] });

      const previousClients = query.getQueryData(['clients']);
      query.setQueryData(['clients'], (oldClients: Client[]) => {
        const list = oldClients
          ? oldClients.filter((client) => client.id !== client_id)
          : [];
        return list;
      });

      return { previousClients };
    },
    onError: (_, __, context) => {
      query.setQueryData(['clients'], context?.previousClients);
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
