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
