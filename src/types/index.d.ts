export type Income = {
  amount: number;
  category: string;
  notes?: string;
  date: string;
  id: string;
  source?: string;
};
export type Expense = {
  amount: number;
  category: string;
  notes?: string;
  date: string;
  id: string;
  payee?: string;
  createdAt?: string;
};

export type Client = {
  id: string | number; // Changed to allow both string and number for flexibility
  name: string;
  email: string;
  phone: string;
  company?: string;
  avatar?: string;
  status: 'active' | 'inactive'; // Added status field
};

export type Milestone = {
  title: string;
  description: string;
  due_date: string;
};

export type Project = {
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on hold';
  client_id: string;
  milestones: Milestone[];
};

export type Task = {
  name: string;
  description: string;
  due_date: string;
  client_id: string;
  project_id: string;
  user_id: string;
  completed: boolean;
  status: 'todo' | 'in_progress' | 'completed';
  id: string;
};

export type Invoice = {
  id: string;
  client_id: number | string; // Allow both number and string for client_id
  user_id: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'unpaid' | 'overdue';
  notes?: string;
  createdAt?: string;
};
