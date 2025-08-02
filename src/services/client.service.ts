import {
  createClient,
  deleteClient,
  editClient,
  getClientById,
  getClients,
} from '@/api/clients.api';
import type { Client } from '@/types';
import type {
  CreateClientVariables,
  EditClientVariables,
} from '@/types/client.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const STALE_TIME = 10000;
// Hooks for queries

export const useGetClients = () =>
  useQuery<Client[]>({
    queryFn: getClients,
    queryKey: ['clients'],
    staleTime: STALE_TIME,
  });

export const useGetClientById = (id: Client['id']) =>
  useQuery({
    queryFn: () => getClientById(id),
    queryKey: ['clients', id],
    staleTime: STALE_TIME,
  });

export const useCreateClient = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ newClient, user_id }: CreateClientVariables) => {
      return createClient(newClient, user_id);
    },

    onMutate: async ({ newClient }: CreateClientVariables) => {
      await query.cancelQueries({ queryKey: ['clients'] });

      const previousClients = query.getQueryData(['clients']);

      query.setQueryData(['clients'], (oldClients: Client[]) => {
        if (!oldClients) {
          return [newClient];
        }
        return [...oldClients, newClient];
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

export const useEditClient = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ client_id, client, user_id }: EditClientVariables) => {
      return editClient(client_id, user_id, client);
    },

    onMutate: async ({ client, client_id }: EditClientVariables) => {
      await query.cancelQueries({ queryKey: ['clients', client_id] });

      const previousClients = query.getQueryData(['clients', client_id]);

      query.setQueryData(['clients', client_id], client);

      return { previousClients, client, client_id };
    },

    onError: (err, __, context) => {
      query.setQueryData(
        ['clients', context?.client_id],
        context?.previousClients
      );
      console.error('Error from Supabase:', err);
      throw new Error(
        `Failed to create client: ${err.message || 'Unknown error'}`
      );
    },

    onSettled: (_, error, __, context) => {
      if (error) {
        console.error(error);
      }
      query.invalidateQueries({
        queryKey: ['clients', context?.client_id],
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
