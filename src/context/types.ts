import type { Expense, Income } from '@/types';

export type ActionTypes =
  | {
      type: 'GET_INCOMES';
      payload: Income[];
    }
  | {
      type: 'GET_EXPENSES';
      payload: Expense[];
    }
  | {
      type: 'ADD_INCOME';
      payload: Income;
    }
  | {
      type: 'ADD_EXPENSE';
      payload: Expense;
    }
  | {
      type: 'GET_TOTAL_EXPENSES';
    }
  | {
      type: 'GET_TOTAL_INCOME';
    }
  | {
      type: 'GET_TOTAL_BALANCE';
    };

export type FinanceState = {
  loading: boolean;
  incomes: Income[] | null;
  expenses: Expense[] | null;
  error: string | null;
  totalExpenses: number;
  totalIncome: number;
  totalBalance: number;
  success?: boolean;
};
export type FinanceDispatch = React.ActionDispatch<[action: ActionTypes]>;
