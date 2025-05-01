import type { Expense, Income } from '@/types';

export const addIncome = async (income: Income) => {
  const previousData: Income[] = JSON.parse(
    localStorage.getItem('incomes') ?? '[]'
  );
  const newData = [...previousData, income];
  localStorage.setItem('incomes', JSON.stringify(newData));
};

export const addExpense = async (expense: Expense) => {
  const previousData: Expense[] = JSON.parse(
    localStorage.getItem('expenses') ?? '[]'
  );
  const newData = [...previousData, expense];
  localStorage.setItem('expenses', JSON.stringify(newData));
};
