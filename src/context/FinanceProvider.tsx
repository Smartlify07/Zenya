import type { Expense, Income } from '@/types';
import React, { createContext, useEffect, useReducer } from 'react';
import { financeReducer } from './reducers';
import type { ActionTypes, FinanceState } from './types';
import { fetchExpenses, fetchIncomes, getTotalBalance } from '@/lib/actions';
import { useAuth } from '@/hooks/use-auth';

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
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      await fetchIncomes(dispatch, user?.id);
      await fetchExpenses(dispatch, user?.id);
      await getTotalBalance(dispatch);
    };
    if (user) fetchData();
  }, [dispatch, user]);
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
