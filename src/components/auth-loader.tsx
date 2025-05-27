import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const AuthLoader = ({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <Loader2 className={cn('animate-spin', className)} fill={fill ?? 'none'} />
  );
};
