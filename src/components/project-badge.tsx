import type { Project } from '@/types';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

export const ProjectBadge = ({ status }: { status: Project['status'] }) => {
  return (
    <Badge
      className={cn(
        status === 'active' && 'text-blue-500 bg-blue-100',
        status === 'completed' && 'text-green-500 bg-green-100',
        status === 'on_hold' && 'text-yellow-500 bg-yellow-100'
      )}
    >
      {status}
    </Badge>
  );
};
