import type { FinanceDispatch } from '@/context/types';
import type { Expense, Income } from '@/types';

export const fetchIncomes = (dispatch: FinanceDispatch) => {
  const incomes: Income[] = JSON.parse(localStorage.getItem('incomes') ?? '[]');
  dispatch({ type: 'GET_INCOMES', payload: incomes });
  getTotalIncome(dispatch);
  return incomes;
};

export const fetchExpenses = (dispatch: FinanceDispatch) => {
  const expenses: Expense[] = JSON.parse(
    localStorage.getItem('expenses') ?? '[]'
  );
  dispatch({ type: 'GET_EXPENSES', payload: expenses });
  getTotalExpenses(dispatch);
  return expenses;
};
export const addIncome = async (income: Income, dispatch: FinanceDispatch) => {
  const previousData: Income[] = JSON.parse(
    localStorage.getItem('incomes') ?? '[]'
  );
  const newData = [...previousData, income];
  localStorage.setItem('incomes', JSON.stringify(newData));
  dispatch({
    type: 'ADD_INCOME',
    payload: income,
  });
};

export const addExpense = async (
  expense: Expense,
  dispatch: FinanceDispatch
) => {
  const previousData: Expense[] = JSON.parse(
    localStorage.getItem('expenses') ?? '[]'
  );
  const newData = [...previousData, expense];
  localStorage.setItem('expenses', JSON.stringify(newData));
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

export const getTotalBalance = (dispatch: FinanceDispatch) => {
  dispatch({ type: 'GET_TOTAL_BALANCE' });
};
