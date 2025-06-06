import type { Project } from '@/types';
import { Card, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { ProjectMilestone } from './project-milestone';

export const RecentProjects = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="w-full md:w-6/12 flex flex-col gap-4">
      <h1 className="text-lg font-medium text-primary">Recent projects</h1>

      <div className="grid gap-4">
        {projects.slice(0, 4).map((project) => (
          <RecentProjectsCard {...project} />
        ))}
      </div>
    </section>
  );
};

export const RecentProjectsCard = ({ name, status, milestones }: Project) => {
  return (
    <Card className="shadow-2xs flex flex-col px-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-base font-medium text-primary">{name}</h1>
          <div className="flex items-center gap-1">
            <User size={16} className="text-neutral-400" />
            <h3 className="text-sm text-neutral-600">John Doe</h3>
          </div>
        </div>
        <Badge
          className={cn(
            'capitalize self-end',
            status === 'active' && 'text-blue-600 bg-blue-600/20',
            status === 'completed' && 'text-green-600 bg-green-600/20',
            status === 'on hold' && 'text-yellow-400 bg-yellow-400/20'
          )}
        >
          {status}
        </Badge>
      </div>

      <CardFooter className="flex px-0 flex-col gap-2 w-full justify-between">
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-neutral-800 flex items-center font-medium text-sm">
            Upcoming milestones
          </h3>

          <div className="w-full border-t border-dashed" />

          <div className="flex flex-col gap-1">
            {milestones.slice(0, 2).map((milestone, index) => (
              <ProjectMilestone key={index} milestone={milestone} />
            ))}
          </div>
        </div>

        <div className="w-full border-t border-dashed" />

        <Button variant={'ghost'} className="mt-1">
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};
