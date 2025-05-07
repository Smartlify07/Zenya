import type { Expense, Income } from '@/types';
import React, { createContext, useEffect, useReducer } from 'react';
import { financeReducer } from './reducers';
import type { ActionTypes, FinanceState } from './types';
import { fetchExpenses, fetchIncomes, getTotalBalance } from '@/lib/actions';

type FinanceContextType = {
  incomes: Income[] | null;
  expenses: Expense[] | null;
  dispatch: React.ActionDispatch<[action: ActionTypes]>;
  totalExpenses: number;
  totalIncome: number;
  totalBalance: number;
};

export const FinanceContext = createContext<FinanceContextType | undefined>(
  undefined
);

const initialState: FinanceState = {
  loading: true,
  incomes: null,
  expenses: null,
  totalExpenses: 0,
  totalIncome: 0,
  totalBalance: 0,
  error: null,
};

const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  useEffect(() => {
    (async () => {
      await fetchIncomes(dispatch);
      await fetchExpenses(dispatch);
      await getTotalBalance(dispatch);
    })();
  }, [dispatch]);
  return (
    <FinanceContext.Provider
      value={{
        incomes: state.incomes,
        expenses: state.expenses,
        totalExpenses: state.totalExpenses,
        totalIncome: state.totalIncome,
        totalBalance: state.totalBalance,
        dispatch: dispatch,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceProvider;
