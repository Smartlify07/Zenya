import type { User } from '@supabase/supabase-js';
import type { Client } from '.';

export type CreateClientData = Omit<Client, 'id'>;
export type CreateClientVariables = {
  newClient: CreateClientData;
  user_id: User['id'];
};

export type EditClientPayload = Omit<Partial<Client>, 'id'>;
export type EditClientVariables = {
  client: EditClientPayload;
  client_id: Client['id'];
  user_id: User['id'];
};
