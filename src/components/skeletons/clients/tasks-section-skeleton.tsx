import { Skeleton } from '@/components/ui/skeleton';

const TasksSectionSkeleton = () => {
  return (
    <section>
      <div className="shadow-2xs px-4 font-inter border rounded-md">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
        <div className="flex flex-col gap-4 px-0 pb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col border rounded-md py-4 px-4 gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex flex-col self-end items-end gap-3">
                  <Skeleton className="h-8 w-24 rounded-md" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-6 w-20 rounded" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-6 w-32 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TasksSectionSkeleton;
