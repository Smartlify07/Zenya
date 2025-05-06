import type { ActionTypes, FinanceState } from './types';

export const financeReducer = (state: FinanceState, action: ActionTypes) => {
  switch (action.type) {
    case 'GET_INCOMES': {
      return { ...state, loading: false, incomes: action.payload };
    }

    case 'ADD_INCOME': {
      const newIncomes = [...(state.incomes || []), action.payload];
      return {
        ...state,
        loading: false,
        incomes: newIncomes,
        totalIncome: state.totalIncome + action.payload.amount,
      };
    }

    case 'ADD_EXPENSE': {
      const newExpenses = [...(state.expenses || []), action.payload];
      return {
        ...state,
        loading: false,
        expenses: newExpenses,
        totalExpenses: state.totalExpenses + action.payload.amount,
      };
    }
    case 'GET_EXPENSES': {
      return { ...state, loading: false, expenses: action.payload };
    }
    case 'GET_TOTAL_EXPENSES': {
      const totalExpenses =
        state.expenses?.reduce(
          (previous, current) => previous + current.amount,
          0
        ) ?? 0;
      return { ...state, totalExpenses };
    }
    case 'GET_TOTAL_INCOME': {
      const totalIncome =
        state.incomes?.reduce((prev, curr) => prev + curr.amount, 0) ?? 0;
      return { ...state, totalIncome };
    }
    case 'GET_TOTAL_BALANCE':
      const totalBalance = state.totalIncome - state.totalExpenses;
      return { ...state, totalBalance };

    default: {
      return state;
    }
  }
};
