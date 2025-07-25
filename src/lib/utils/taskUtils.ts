import type { Task } from '@/types';

export const getStatusColor = (status: Task['status']) => {
  return status === 'completed'
    ? 'bg-green-500/30 text-green-500'
    : status === 'in_progress'
    ? 'bg-yellow-400/20 text-yellow-400 '
    : status === 'todo'
    ? 'bg-neutral-100 text-neutral-600'
    : '';
};
