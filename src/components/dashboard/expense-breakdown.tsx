import { ExpenseGrid } from '../expense-grid';
import { CATEGORY_COLORS, expenseCategories } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const ExpenseBreakdown = () => {
  return (
    <section className="md:w-6/12 flex flex-col gap-4">
      <div className="gap-2 flex flex-col">
        <h1 className="text-lg font-inter font-medium">Expense Breakdown</h1>
        <ExpenseGrid />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {expenseCategories.slice(0, 5).map((category) => (
          <Badge
            className={`self-end font-medium font-inter ${
              CATEGORY_COLORS[category.id]
            }`}
          >
            {category.label}
          </Badge>
        ))}
        <Badge
          className={`self-end font-medium font-inter bg-neutral-50 text-neutral-900`}
        >
          No expense
        </Badge>
      </div>
    </section>
  );
};
