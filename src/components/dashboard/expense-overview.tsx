import { useFinance } from '@/hooks/useFinance';
import { ExpenseCard } from '../cards/expense-card';

export const ExpenseOverview = () => {
  const { expenses } = useFinance();

  return (
    <section className="font-inter rounded-lg w-full md:w-6/12 flex flex-col gap-1 py-2">
      <header>
        <h1 className="font-semibold text-lg">Expenses Overview</h1>
      </header>

      <div className="flex flex-col">
        {expenses?.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </section>
  );
};
