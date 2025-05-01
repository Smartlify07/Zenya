import type { Income } from '@/types';

export const addIncome = async (income: Income) => {
  setTimeout(async () => {
    console.log('added income', income);
  }, 3000);
};
