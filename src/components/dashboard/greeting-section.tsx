import { getTimeOfDayName } from '@/lib/utils/dashboardUtils';
import type { Task } from '@/types';
import UpcomingTasks from './upcoming-tasks';

export const GreetingSection = ({
  name,
  tasks,
}: {
  name: string;
  tasks: Task[];
}) => {
  const greeting = `${getTimeOfDayName()}, ${name}`;
  return (
    <section className="p-2 flex flex-col gap-1 bg-white border rounded-2xl w-full">
      <div className="p-5 flex flex-col gap-2 bg-neutral-100 rounded-2xl">
        <h1 className="text-2xl font-medium text-primary font-inter">
          {greeting}
        </h1>
        <h2 className="text-base font-normal font-inter">
          Here's your agenda for today.
        </h2>

        <UpcomingTasks tasks={tasks} />
      </div>
    </section>
  );
};
