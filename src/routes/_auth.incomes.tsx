import { IncomeCard } from '@/components/cards/income-card';
import { EmptyStateCard } from '@/components/empty-states/empty-finance-state';
import CardSkeleton from '@/components/skeletons/card-skeleton';
import { useFinance } from '@/hooks/useFinance';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/incomes')({
  component: IncomesPage,
});

function IncomesPage() {
  const { incomes, loading } = useFinance();
  return (
    <main className="font-inter flex flex-col gap-4  px-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-neutral-800 text-xl font-semibold">Incomes</h1>
        <p className="text-sm text-neutral-500">Track your incomes here.</p>
      </header>
      <div className="flex flex-col gap-4">
        {!loading
          ? incomes?.map((income) => (
              <IncomeCard key={income.id} income={income} />
            ))
          : Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      {incomes?.length === 0 && (
        <EmptyStateCard
          className="w-full self-center"
          action="income"
          buttonText="Add Income"
          title="No Income streams Found"
          description="You haven't recorded any expenses yet. Start by adding your first expense."
        />
      )}
    </main>
  );
}
