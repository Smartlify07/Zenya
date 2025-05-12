import { Skeleton } from '../ui/skeleton';

export default function StatCardSkeleton() {
  return (
    <div className="rounded-lg border p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
