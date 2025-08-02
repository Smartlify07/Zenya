// Functions for making supabase calls

import { supabase } from '@/lib/supabase';
import type { Client } from '@/types';
import type { CreateClientData, EditClientPayload } from '@/types/client.types';
import type { User } from '@supabase/supabase-js';

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

const getClientById = async (id: Client['id']) => {
  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }
  return client as Client;
};

const editClient = async (
  id: Client['id'],
  user_id: User['id'],
  data: EditClientPayload
) => {
  const { data: client, error } = await supabase
    .from('clients')
    .update({
      ...data,
      user_id,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }
  return client as Client;
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

export { editClient, deleteClient, getClients, getClientById, createClient };
