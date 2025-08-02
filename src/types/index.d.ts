export type BaseType = {
  id: string | number; // Allow both number and string for id
  created_at?: string;
  updated_at?: string;
};

export type Income = BaseType & {
  amount: number;
  category: string;
  notes?: string;
  date: string;
  id: string;
  source?: string;
};
export type Expense = BaseType & {
  amount: number;
  category: string;
  notes?: string;
  date: string;
  id: string;
  payee?: string;
};

export type Client = BaseType & {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  avatar?: string;
  lead_source?: string;
  notes?: string;
  status: 'active' | 'inactive';
};

export type Milestone = BaseType & {
  title: string;
  description: string;
  due_date: string;
};

export type Project = BaseType & {
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on_hold';
  client_id: string;
  milestones: Milestone[] | null;
  start_date: Date;
  end_date: Date;
  clients: Client;
  tasks: Task[];
};

export type Task = BaseType & {
  name: string;
  description?: string;
  due_date: string;
  client_id: string;
  project_id: string;
  status: 'todo' | 'in_progress' | 'completed';
  clients: Client;
  projects: Project;
};

export type Invoice = BaseType & {
  id: string;
  client_id: number | string; // Allow both number and string for client_id
  user_id: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'unpaid' | 'overdue';
  notes?: string;
  createdAt?: string;
};

export type SupabaseFetchResult<T> = {
  data: T | null;
  error: PostgrestResponse<Task>['error'];
};
