import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function CardSkeleton() {
  return (
    <div className="border-b py-4 overflow-hidden md:px-2 flex flex-col md:flex-row md:justify-between">
      <div className="flex flex-col gap-2 w-8/12">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2 h-5 items-center">
            <Skeleton className="h-3 w-16" />
            <Separator orientation="vertical" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <div className="rounded-sm truncate flex gap-1 items-center h-6 w-fit text-start text-sm text-neutral-600 bg-neutral-100 py-0.5 px-2">
          <Separator
            className="data-[orientation=vertical]:w-1 h-5 rounded-lg"
            orientation="vertical"
          />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="self-end h-6 w-16 rounded-full" />
    </div>
  );
}
