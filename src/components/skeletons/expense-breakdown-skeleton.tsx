import { Skeleton } from '../ui/skeleton';

export const ExpenseBreakdownSkeleton = () => {
  return (
    <section className="md:w-6/12 flex flex-col gap-4 animate-pulse">
      <div className="gap-8 flex flex-col">
        <Skeleton className="h-6 w-40 rounded-md" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <Skeleton key={i} className="size-10 rounded-md" />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-md" />
        ))}
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
    </section>
  );
};
