import type { Expense } from '@/types';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { CATEGORY_COLORS, expenseCategories } from '@/lib/utils';
import { useMemo } from 'react';

export const ExpenseCard = ({ expense }: { expense: Expense }) => {
  const categoryLabel = useMemo(() => {
    return (
      expenseCategories.find((category) => category.id === expense.category)
        ?.label ?? ''
    );
  }, [expenseCategories]);
  const categoryColor = CATEGORY_COLORS?.[expense.category];
  return (
    <div className="border-b py-4 overflow-hidden md:px-2 flex flex-col md:flex-row md:justify-between">
      <div className="flex flex-col gap-2 w-8/12">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-medium first-letter:capitalize">
            {expense?.payee}
          </h1>
          <div className="flex gap-2 h-5">
            <p className="text-sm text-neutral-800">
              ₦{expense.amount.toLocaleString()}
            </p>
            <Separator orientation="vertical" />
            <p className="text-sm text-neutral-800 truncate">
              Date of Expense: {format(new Date(expense.date), 'PPP')}
            </p>
          </div>
        </div>
        <div className="rounded-sm truncate flex gap-1 items-center h-6 w-fit text-start text-sm text-neutral-600 bg-neutral-100 py-0.5 px-2">
          <Separator
            className="data-[orientation=vertical]:w-1 h-5 rounded-lg"
            orientation="vertical"
          />
          {expense.notes}
        </div>
      </div>
      {categoryColor && (
        <Badge className={`self-end ${categoryColor}`}>{categoryLabel}</Badge>
      )}
    </div>
  );
};
