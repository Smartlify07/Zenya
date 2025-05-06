import { FinanceContext } from '@/context/FinanceProvider';
import { useContext } from 'react';

export const useFinance = () => {
  const values = useContext(FinanceContext);
  if (!values) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return values;
};
