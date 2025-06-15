import { differenceInDays } from 'date-fns';

export const getRemainingDays = (date: string): number => {
  const today = new Date();
  const difference = differenceInDays(date, today);
  return difference;
};
