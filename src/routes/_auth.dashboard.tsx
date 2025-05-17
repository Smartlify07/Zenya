import { createFileRoute } from '@tanstack/react-router';
import { OverviewCharts } from '@/components/charts/overview-charts';
import { ExpenseOverview } from '@/components/dashboard/expense-overview';
import { IncomesOverview } from '@/components/dashboard/incomes-overview';
import { StatCard } from '@/components/dashboard/stats-card';
import { useFinance } from '@/hooks/useFinance';
import { CircleDollarSign, CreditCard, Wallet } from 'lucide-react';
import StatCardSkeleton from '@/components/skeletons/stat-card-skeleton';
import CardSkeleton from '@/components/skeletons/card-skeleton';
import ExpenseIncomeChartSkeleton from '@/components/skeletons/chart-skeleton';

import { EmptyStateCard } from '@/components/empty-states/empty-finance-state';
import { ExpenseBreakdown } from '@/components/dashboard/expense-breakdown';
import { ExpenseBreakdownSkeleton } from '@/components/skeletons/expense-breakdown-skeleton';

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const {
    totalExpenses,
    totalIncome,
    totalBalance,
    loading,
    incomes,
    expenses,
  } = useFinance();

  const renderStatCards = () => (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        Icon={Wallet}
        type="balance"
        title="Total Balance"
        amount={totalBalance}
        percentage={30}
      />
      <StatCard
        Icon={CircleDollarSign}
        type="income"
        title="Total Income"
        amount={totalIncome}
        percentage={25}
      />
      <StatCard
        Icon={CreditCard}
        type="expense"
        title="Total Expense"
        amount={totalExpenses}
        percentage={30}
      />
    </div>
  );

  const renderStatSkeletons = () =>
    Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />);

  const renderCardSkeletons = (count = 3) =>
    Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />);

  const renderExpensesOverview = () => {
    if (loading) {
      return (
        <section className="flex flex-col md:flex-row gap-4">
          <ExpenseBreakdownSkeleton />
          <div className="flex flex-col md:w-6/12">{renderCardSkeletons()}</div>
        </section>
      );
    }
    const hasExpense = expenses?.length! > 0;

    if (!hasExpense) {
      return (
        <section className="flex flex-col md:flex-row gap-4">
          <EmptyStateCard
            title="No Expenses Yet"
            description="Start tracking your expenses to see your expense breakdown here."
          />
          <EmptyStateCard
            action="expense"
            buttonText="Add expense"
            title="Expense Breakdown Unavailable"
            description="Track expenses to get a detailed overview."
          />
        </section>
      );
    }

    return (
      <>
        <section className="flex flex-col md:flex-row gap-4">
          <ExpenseBreakdown />
          <ExpenseOverview />
        </section>
      </>
    );
  };

  const renderIncomesOverview = () => {
    if (loading)
      return (
        <section className="flex flex-col md:flex-row gap-4">
          <ExpenseIncomeChartSkeleton />
          <div className="flex flex-col md:w-6/12">{renderCardSkeletons()}</div>
        </section>
      );
    const hasIncome = incomes?.length! > 0;
    const hasExpense = expenses?.length! > 0;
    if (!hasIncome && !hasExpense) {
      return (
        <section className="flex flex-col md:flex-row gap-4">
          <EmptyStateCard
            title="No Data Available"
            description="Add your first income or expense to see charts here."
          />
          <EmptyStateCard
            action="income"
            buttonText="Add income"
            title="No Income Records"
            description="Record your incomes to see an overview here."
          />
        </section>
      );
    } else if (!hasIncome && hasExpense) {
      return (
        <section className="flex flex-col md:items-start md:flex-row gap-4">
          <OverviewCharts />
          <EmptyStateCard
            action="income"
            buttonText="Add income"
            title="No Income Records"
            description="Record your incomes to see an overview here."
          />
        </section>
      );
    }

    return (
      <section className="flex flex-col md:flex-row gap-4">
        <OverviewCharts />
        <IncomesOverview />
      </section>
    );
  };

  return (
    <main className="flex flex-col gap-8 items-center px-4 py-4 md:px-4">
      <div className="flex flex-col gap-8 w-full max-w-[1440px]">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {renderStatSkeletons()}
          </div>
        ) : (
          renderStatCards()
        )}
        {renderIncomesOverview()}
        {renderExpensesOverview()}
      </div>
    </main>
  );
}
