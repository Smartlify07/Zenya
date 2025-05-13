import { useFinance } from '@/hooks/useFinance';
import { CATEGORY_COLORS, cn } from '@/lib/utils';
import type { Expense } from '@/types';
import { getDate, parseISO } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export const ExpenseGrid = () => {
  // Show the grid with colors representing the category of expense.  For every month.
  // 30 days in a month , use the date from each expense to put in the box repping the day of the expense.
  const { expenses } = useFinance();
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
  return (
    <div className="grid font-inter gap-2 justify-items-start grid-cols-7">
      {Array.from({ length: 30 }).map((_, i) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              key={i}
              className={cn(
                'size-10 rounded-md bg-neutral-50 col-span-1',
                findExpense(i).color
              )}
            />
            {findExpense(i).amount && (
              <TooltipContent className="flex font-inter items-center gap-1">
                <span>₦{findExpense(i).amount?.toLocaleString()} </span>
                <div className="rounded-full w-0.5 h-0.5 bg-white"></div>{' '}
                {findExpense(i).category}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
