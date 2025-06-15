import { Skeleton } from '@/components/ui/skeleton';

const TopSectionSkeleton = () => {
  return (
    <section className="border-r font-inter flex flex-col gap-4">
      <header className="flex w-full py-5 h-[150px] relative bg-linear-to-tr from-neutral-50 to-neutral-100 items-center gap-4">
        <div className="size-28 absolute top-[100px] border left-[80px] rounded-md overflow-hidden">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
      </header>

      <section className="flex flex-col gap-2 mt-24 px-20">
        <Skeleton className="h-8 w-48 mb-2" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-24" />
          <span className="rounded-full size-1 bg-neutral-300"></span>
          <Skeleton className="h-5 w-32" />
          <span className="rounded-full size-1 bg-neutral-300"></span>
          <Skeleton className="h-5 w-20" />
          <span className="rounded-full size-1 bg-neutral-300"></span>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </section>

      <section className="flex px-20 items-center gap-4">
        <Skeleton className="h-10 w-32 rounded-md" />
      </section>
    </section>
  );
};

export default TopSectionSkeleton;
