import type { Task } from '@/types';
import { Separator } from '../ui/separator';

const UpcomingTasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="flex flex-col w-6/12 font-inter gap-4 shadow-2xs self-end mt-4 bg-white p-4 rounded-2xl">
      <h1 className="text-base font-medium">Up next</h1>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </section>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="flex items-center gap-3">
      <Separator
        orientation="vertical"
        className="w-1 h-full bg-neutral-700 data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-[40px]"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-primary">{task.name}</h3>
        <h4 className="text-neutral-400 font-normal text-xs">
          {task.due_date}
        </h4>
      </div>
    </div>
  );
};
export default UpcomingTasks;
