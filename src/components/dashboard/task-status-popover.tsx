import type { Task } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';

export const TaskStatusPopover = ({ status }: { status?: Task['status'] }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'rounded-full size-4 flex border-dashed border-2',
            status === 'completed' && 'border-green-500',
            status === 'in_progress' && 'border-yellow-500',
            status === 'todo' && 'border-neutral-500'
          )}
        ></div>
      </PopoverTrigger>

      <PopoverContent className="flex font-inter flex-col gap-2 px-2">
        <h1 className="text-sm font-normal text-neutral-600">Change status</h1>

        <div className="flex flex-col">
          <button className="flex hover:bg-neutral-50 rounded-md py-2 px-2 w-full items-center gap-2 text-sm text-neutral-700 font-medium">
            <span className="rounded-full size-2 bg-green-500"></span> Completed
          </button>
          <button className="flex hover:bg-neutral-50 rounded-md py-2 px-2 w-full items-center gap-2 text-sm text-neutral-700 font-medium">
            <span className="rounded-full size-2 bg-yellow-500"></span> In
            Progress
          </button>
          <button className="flex hover:bg-neutral-50 rounded-md py-2 px-2 w-full items-center gap-2 text-sm text-neutral-700 font-medium">
            <span className="rounded-full size-2 bg-neutral-500"></span> Todo
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
