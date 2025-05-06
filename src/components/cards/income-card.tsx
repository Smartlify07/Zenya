import type { Income } from '@/types';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { CATEGORY_COLORS, incomeCategories } from '@/lib/utils';
import { useMemo } from 'react';

export const IncomeCard = ({ income }: { income: Income }) => {
  const categoryLabel = useMemo(() => {
    return (
      incomeCategories.find((category) => category.id === income.category)
        ?.label ?? ''
    );
  }, [incomeCategories]);
  return (
    <div className="border-b py-4 px-2 flex justify-between">
      <div className="flex flex-col gap-2 w-8/12">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-medium">{income.source}</h1>
          <div className="flex gap-2 h-5">
            <p className="text-sm text-neutral-800">
              ₦{income.amount.toLocaleString()}
            </p>
            <Separator orientation="vertical" />
            <p className="text-sm text-neutral-800">
              Date of income: {format(new Date(income.date), 'PPP')}
            </p>
          </div>
        </div>
        <p className="rounded-sm truncate flex gap-1 items-center h-6 w-fit text-start text-sm text-neutral-600 bg-neutral-100 py-0.5 px-2">
          <Separator
            className="data-[orientation=vertical]:w-1 h-5 rounded-lg"
            orientation="vertical"
          />
          {income.notes}
        </p>
      </div>
      <Badge
        className={`self-end ${CATEGORY_COLORS[income.category]}`}
        variant="outline"
      >
        {categoryLabel}
      </Badge>
    </div>
  );
};
