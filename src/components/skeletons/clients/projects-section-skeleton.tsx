import { Skeleton } from '@/components/ui/skeleton';

const ProjectsSectionSkeleton = () => {
  return (
    <section>
      <div className="shadow-2xs px-4 font-inter border rounded-md">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
        <div className="flex flex-col gap-4 px-0 pb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex border justify-between rounded-md p-4 gap-1"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full self-end" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSectionSkeleton;
