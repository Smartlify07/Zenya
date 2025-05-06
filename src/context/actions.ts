import type { Income } from '@/types';
import type { FinanceDispatch } from './types';

export const dispatchAddIncome = (
  income: Income,
  dispatch: FinanceDispatch
) => {
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
export const dispatchFetchIncomes = (dispatch: FinanceDispatch) => {
  const incomes: Income[] = JSON.parse(localStorage.getItem('incomes') ?? '[]');
  dispatch({
    type: 'GET_INCOMES',
    payload: incomes,
  });
};
export const getTotalIncome = (incomes: Income[]) => {
  return incomes.reduce((acc, income) => acc + income.amount, 0);
};
