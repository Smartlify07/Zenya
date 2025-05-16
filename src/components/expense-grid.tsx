import { useFinance } from '@/hooks/useFinance';
import { CATEGORY_COLORS, cn } from '@/lib/utils';
import type { Expense } from '@/types';
import { getDate, getMonth, getYear, parseISO } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useEffect, useState } from 'react';

import CalendarDates, { type CalendarDatesResult } from 'calendar-dates';
const calendarDates = new CalendarDates();

export const ExpenseGrid = () => {
  // Show the grid with colors representing the category of expense.  For every month.
  // 30 days in a month , use the date from each expense to put in the box repping the day of the expense.
  const { expenses } = useFinance();
  const [dates, setDates] = useState<CalendarDatesResult[]>([]);

  const getCategoryColor = (category: Expense['category']) => {
    return CATEGORY_COLORS[category];
  };
  const findExpense = (day: number) => {
    const foundExpense = expenses?.find(
      (expense) => getDate(parseISO(expense.date)) === day
    );
    if (!foundExpense) {
      return { color: null, amount: null, category: null };
    }
    return {
      color: getCategoryColor(foundExpense.category),
      amount: foundExpense.amount,
      category: foundExpense.category,
    };
  };

  useEffect(() => {
    const getDates = async () => {
      const currentYear = getYear(new Date());
      const currentMonth = getMonth(new Date());
      const currentMonthAndYear = new Date(currentMonth, currentYear);
      const dates = await calendarDates.getDates(currentMonthAndYear);
      const currentDates = dates.filter((date) => date.type === 'current');
      setDates(currentDates);
    };
    (async () => await getDates())();
  }, []);

  return (
    <div className="grid font-inter gap-2 justify-items-start grid-cols-7">
      {dates.map((date) => {
        const expense = findExpense(date.date);
        console.log(expense);
        return (
          <TooltipProvider key={date.date}>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  'size-10 rounded-md bg-neutral-50 col-span-1',
                  expense.color
                )}
              />
              {expense.amount && (
                <TooltipContent className="flex font-inter items-center gap-1">
                  <span>₦{expense.amount?.toLocaleString()}</span>
                  <div className="rounded-full w-0.5 h-0.5 bg-white"></div>{' '}
                  {expense.category}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};
