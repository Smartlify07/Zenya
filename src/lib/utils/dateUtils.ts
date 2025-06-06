import { differenceInDays } from 'date-fns';

export const getRemainingDays = (date: string): number => {
  const today = new Date();
  return differenceInDays(date, today);
};
