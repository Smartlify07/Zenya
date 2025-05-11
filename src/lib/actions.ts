import type { FinanceDispatch } from '@/context/types';
import type { Expense, Income } from '@/types';
import { supabase } from './supabase';
import { toast } from 'sonner';
import { getUser } from './auth.actions';

export const fetchIncomes = async (dispatch: FinanceDispatch) => {
  const user = await getUser();
  const { data } = await supabase
    .from('incomes')
    .select('*')
    .eq('user_id', user?.data?.user?.id);
  const incomes: Income[] = data! ?? [];
  dispatch({ type: 'GET_INCOMES', payload: incomes });
  getTotalIncome(dispatch);
  return incomes;
};

export const fetchExpenses = async (dispatch: FinanceDispatch) => {
  const user = await getUser();

  const { data } = await supabase
    .from('expenses')
    .select(`*`)
    .eq('user_id', user?.data?.user?.id);
  const expenses: Expense[] = data as Expense[];
  dispatch({ type: 'GET_EXPENSES', payload: expenses });
  getTotalExpenses(dispatch);
  return expenses;
};
export const addIncome = async (income: Income, dispatch: FinanceDispatch) => {
  try {
    const user = await getUser();

    await supabase.from('incomes').insert([
      {
        ...income,
        user_id: user?.data?.user?.id,
      },
    ]);
    dispatch({
      type: 'ADD_INCOME',
      payload: income,
    });
  } catch (error) {
    console.error('Error adding income:', error);
    toast.error('Error adding income, please try again later.');
  }
};

export const addExpense = async (
  expense: Expense,
  dispatch: FinanceDispatch
) => {
  const user = await getUser();

  try {
    await supabase
      .from('expenses')
      .insert({ ...expense, user_id: user?.data?.user?.id });
    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    toast.error('Error adding expense, please try again later.');
  }
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
