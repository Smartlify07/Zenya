import type { Client, Task } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/api/supabase/tasks';
import { useAuth } from '@/context/auth-provider';
import { toast } from 'sonner';

export const TaskStatusPopover = ({
  status,
  client_id,
  task_id,
}: {
  status?: Task['status'];
  client_id: Client['id'];
  task_id: Task['id'];
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (status: Task['status']) => {
      return await updateTask({ status }, user?.id!, client_id, task_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Successfully updated task');
    },
    onError: (error: any) => {
      if (
        error?.message?.includes('violates Row Level Security Policies') ||
        error?.code === '42501'
      ) {
        toast.error(`You don't have permission to perform this action.`);
      } else {
        toast.error(
          'An unexpected error occurred. Please try again or contact support.'
        );
      }
    },
  });

  const handleUpdateStatus = async (status: Task['status']) => {
    if (!status) {
      return;
    }
    try {
      await mutation.mutateAsync(status);
    } catch (error) {
      console.error('Unexpected error during mutation call', error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'rounded-full size-4  cursor-pointer flex border-dashed border-2',
            status === 'completed' && 'border-green-500',
            status === 'in_progress' && 'border-yellow-500',
            status === 'todo' && 'border-neutral-500'
          )}
        ></div>
      </PopoverTrigger>

      <PopoverContent className="flex font-inter flex-col gap-2 px-2">
        <h1 className="text-sm font-normal text-neutral-600">Change status</h1>

        <div className="flex flex-col">
          <button
            onClick={() => {
              handleUpdateStatus('completed');
            }}
            className="flex hover:bg-neutral-50 rounded-md py-2 px-2 w-full items-center gap-2 text-sm text-neutral-700 font-medium"
          >
            <span className="rounded-full size-2 bg-green-500"></span> Completed
          </button>

          <button
            onClick={() => {
              handleUpdateStatus('in_progress');
            }}
            className="flex hover:bg-neutral-50 rounded-md py-2 px-2 w-full items-center gap-2 text-sm text-neutral-700 font-medium"
          >
            <span className="rounded-full size-2 bg-yellow-500"></span> In
            Progress
          </button>

          <button
            onClick={() => {
              handleUpdateStatus('todo');
            }}
            className="flex hover:bg-neutral-50 rounded-md py-2 px-2 w-full items-center gap-2 text-sm text-neutral-700 font-medium"
          >
            <span className="rounded-full size-2 bg-neutral-500"></span> Todo
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
