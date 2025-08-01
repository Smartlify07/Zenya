import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import type { Client } from '@/types';

export const ClientBadge = ({ status }: { status: Client['status'] }) => {
  return (
    <Badge
      className={cn(
        status === 'active' && 'text-green-500 bg-green-100',
        status === 'inactive' && 'text-red-500 bg-red-100'
      )}
    >
      {status}
    </Badge>
  );
};
