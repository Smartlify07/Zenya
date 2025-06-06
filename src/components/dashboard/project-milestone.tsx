import { cn } from '@/lib/utils';
import type { Milestone } from '@/types';
import { getRemainingDays } from '@/lib/utils/dateUtils';
import { Badge } from '../ui/badge';
import {
  getProjectDaysLeftColor,
  getProjectsDaysLeftText,
} from '@/lib/utils/dashboardUtils';

export const ProjectMilestone = ({ milestone }: { milestone: Milestone }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <h1 className="flex items-center gap-1">
        <span className="rounded-md size-2 border border-neutral-400"></span>
        <span className="text-sm text-neutral-600">{milestone.title}</span>
      </h1>

      <Badge
        variant={'outline'}
        className={cn(
          'font-normal',
          getProjectDaysLeftColor(getRemainingDays(milestone.due_date))
        )}
      >
        {getProjectsDaysLeftText(getRemainingDays(milestone.due_date))}
      </Badge>
    </div>
  );
};
