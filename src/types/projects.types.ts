import type { User } from '@supabase/supabase-js';
import type { Project } from '.';

export type ProjectCreationPayload = Omit<
  Project,
  'id' | 'milestones' | 'tasks' | 'clients'
> & { user_id: User['id'] };

export type ProjectCreationVariables = {
  data: ProjectCreationPayload;
  user_id: User['id'];
};

export type ProjectUpdatePayload = Partial<Project>;
export type ProjectUpdateVariables = {
  data: ProjectUpdatePayload;
  user_id: User['id'];
};
