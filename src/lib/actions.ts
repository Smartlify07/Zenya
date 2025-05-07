import type { FinanceDispatch } from '@/context/types';
import type { Expense, Income } from '@/types';
import { supabase } from './supabase';

export const fetchIncomes = async (dispatch: FinanceDispatch) => {
  const { data } = await await supabase.from('incomes').select('*');
  const incomes: Income[] = data as Income[];
  dispatch({ type: 'GET_INCOMES', payload: incomes });
  getTotalIncome(dispatch);
  return incomes;
};

export const fetchExpenses = async (dispatch: FinanceDispatch) => {
  const { data } = await supabase.from('expenses').select('*');
  const expenses: Expense[] = data as Expense[];
  dispatch({ type: 'GET_EXPENSES', payload: expenses });
  getTotalExpenses(dispatch);
  return expenses;
};
export const addIncome = async (income: Income, dispatch: FinanceDispatch) => {
  await supabase.from('incomes').insert(income);
  dispatch({
    type: 'ADD_INCOME',
    payload: income,
  });
};

export const addExpense = async (
  expense: Expense,
  dispatch: FinanceDispatch
) => {
  await supabase.from('incomes').insert(expense);
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
