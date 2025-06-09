import { Skeleton } from '../ui/skeleton';

export const DashboardSkeleton = () => {
  const skeletonCardCount = 4;
  const skeletonCards = Array.from({ length: skeletonCardCount });
  const statsCardCount = 4;
  const statsskeltonCards = Array.from({ length: statsCardCount });
  return (
    <main className="flex flex-col font-inter px-4 pb-5 items-center">
      <div className="max-w-[1440px] flex flex-col gap-10 w-full">
        {/* Placeholder for stat cards */}
        <div className="grid gap-4 grid-cols-4 w-full">
          {statsskeltonCards.map((_, index) => (
            <div
              key={index}
              className="flex flex-col font-inter p-2 rounded-md border border-neutral-200 gap-4 col-span-1"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
        {/* Placeholder for recent clients section */}
        <div className="flex items-start gap-10 flex-col md:flex-row justify-between">
          <section className="w-full md:w-6/12 flex flex-col gap-4">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="shadow-none flex flex-col px-4 gap-4 p-4 rounded-md border border-neutral-200"
              >
                <div className="flex items-center gap-4">
                  {/* Skeleton for the Avatar */}
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    {/* Skeleton for the client name */}
                    <Skeleton className="h-4 w-32" />
                    {/* Skeleton for the client email */}
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between">
                  {/* Skeleton for the company name and icon */}
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3 rounded-full" />{' '}
                    {/* For the Building2 icon */}
                    <Skeleton className="h-3 w-24" />{' '}
                    {/* For the company name */}
                  </div>

                  {/* Skeleton for the status badge */}
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </section>

          <section className="w-full md:w-6/12 flex flex-col gap-4">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="flex flex-col px-4 gap-4 p-4 rounded-md border border-neutral-200 shadow-2xs font-inter col-span-1"
              >
                {' '}
                {/* Added fixed width for demonstration */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    {/* Skeleton for the project name */}
                    <Skeleton className="h-5 w-40" />
                    <div className="flex items-center gap-1">
                      {/* Skeleton for the User icon */}
                      <Skeleton className="h-4 w-4 rounded-full" />
                      {/* Skeleton for the client name */}
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                  {/* Skeleton for the status Badge */}
                  <Skeleton className="h-6 w-20 rounded-full self-end" />
                </div>
                <div className="flex px-0 flex-col gap-2 w-full justify-between">
                  <div className="flex flex-col w-full gap-2">
                    {/* Skeleton for "Upcoming milestones" heading */}
                    <Skeleton className="h-4 w-48" />

                    <div className="w-full border-t border-dashed" />

                    <div className="flex flex-col gap-1">
                      {/* Display two milestone skeletons as in the original component */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          {/* Skeleton for the status indicator (a small square) */}
                          <Skeleton className="h-2 w-2 rounded-sm border border-neutral-400" />
                          {/* Skeleton for the milestone title text */}
                          <Skeleton className="h-3 w-40" />
                        </div>
                        {/* Skeleton for the milestone due date badge */}
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-dashed" />

                  {/* Skeleton for "View Project" button */}
                  <Skeleton className="mt-1 h-10 w-full" />
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="flex items-start gap-10 flex-col md:flex-row justify-between">
          <section className="w-full md:w-6/12 flex flex-col gap-4">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-4 rounded-md border border-neutral-200 shadow-2xs font-inter col-span-1"
              >
                {' '}
                {/* Added fixed width for demonstration */}
                {/* Card Header Skeleton */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center w-full justify-between">
                    {/* Skeleton for Invoice ID */}
                    <Skeleton className="h-5 w-24" />
                    {/* Skeleton for "View details" button */}
                    <Skeleton className="h-5 w-28" />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Skeleton for User icon */}
                    <Skeleton className="h-4 w-4 rounded-full" />
                    {/* Skeleton for Client name */}
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                {/* Card Content Skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    {/* Skeleton for the currency symbol and amount */}
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                {/* Card Footer Skeleton */}
                <div className="flex flex-col py-0 gap-2">
                  <div className="flex w-full items-center justify-between">
                    {/* Skeleton for the first Badge (e.g., due date) */}
                    <Skeleton className="h-6 w-28 rounded-full" />
                    {/* Skeleton for the second Badge (e.g., status) */}
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className="w-full md:w-6/12 flex flex-col gap-4">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="shadow-2xs px-4 py-4 rounded-md border border-neutral-200"
              >
                {' '}
                {/* Added padding for skeleton */}
                <div className="flex flex-col gap-2">
                  {/* Skeleton for the task name */}
                  <Skeleton className="h-5 w-48" />
                  {/* Skeleton for the task description */}
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-center px-0 justify-between mt-4">
                  {' '}
                  {/* Added margin-top for spacing */}
                  {/* Skeleton for the due date Badge */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />{' '}
                    {/* For the Calendar icon */}
                    <Skeleton className="h-6 w-36 rounded-full" />{' '}
                    {/* For the "Due in X days" text */}
                  </div>
                  {/* Skeleton for the TaskStatusPopover */}
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
