import type { FinanceDispatch } from '@/context/types';
import type { Expense, Income } from '@/types';
import { supabase } from './supabase';

export const fetchIncomes = async (
  dispatch: FinanceDispatch,
  user_id: string | undefined
) => {
  const { data } = await supabase
    .from('incomes')
    .select('*')
    .eq('user_id', user_id);
  const incomes: Income[] = data! ?? [];
  dispatch({ type: 'GET_INCOMES', payload: incomes });
  getTotalIncome(dispatch);
  return incomes;
};

export const fetchExpenses = async (
  dispatch: FinanceDispatch,
  user_id: string | undefined
) => {
  const { data } = await supabase
    .from('expenses')
    .select(`*`)
    .eq('user_id', user_id);
  const expenses: Expense[] = data as Expense[];
  dispatch({ type: 'GET_EXPENSES', payload: expenses });
  getTotalExpenses(dispatch);
  return expenses;
};
export const addIncome = async (
  income: Income,
  dispatch: FinanceDispatch,
  user_id: string | undefined
) => {
  const res = await supabase.from('incomes').insert([
    {
      ...income,
      user_id,
    },
  ]);
  if (res.error) {
    console.error(res.error.message);
    throw new Error(res.error.message);
  }
  dispatch({
    type: 'ADD_INCOME',
    payload: income,
  });
};

export const addExpense = async (
  expense: Expense,
  dispatch: FinanceDispatch,
  user_id: string | undefined
) => {
  const res = await supabase
    .from('expenses')
    .insert({ ...expense, user_id: user_id });

  if (res.error) {
    console.error(res.error.message);
    throw new Error(res.error.message);
  }

  dispatch({
    type: 'ADD_EXPENSE',
    payload: expense,
  });
};

export const getTotalExpenses = (dispatch: FinanceDispatch) => {
  dispatch({ type: 'GET_TOTAL_EXPENSES' });
};
export const getTotalIncome = (dispatch: FinanceDispatch) => {
  dispatch({ type: 'GET_TOTAL_INCOME' });
};

export const getTotalBalance = async (dispatch: FinanceDispatch) => {
  dispatch({ type: 'GET_TOTAL_BALANCE' });
};
