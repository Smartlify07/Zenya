import type { Project } from '@/types';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, User } from 'lucide-react';
import { EmptyStateCard } from './empty-state-card';

import { Button } from '../ui/button';

export const RecentProjects = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="w-full font-inter md:w-6/12 flex flex-col gap-4">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-lg font-medium text-primary">Recent Projects</h1>
      </div>

      {projects.length === 0 && (
        <EmptyStateCard
          quickAction={'project'}
          title="No project data available"
          buttonText="Add your first project"
        />
      )}
      <div className="grid gap-4">
        {projects.slice(0, 4).map((project) => (
          <RecentProjectsCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export const RecentProjectsCard = ({ name, status, clients }: Project) => {
  return (
    <Card className="shadow-2xs flex flex-col px-4 gap-4">
      <CardHeader className="flex items-start px-0 justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-base font-medium text-primary capitalize">
            {name}
          </h1>
          <div className="flex items-center gap-1">
            <User size={16} className="text-neutral-400" />

            <h3 className="text-sm text-neutral-600">{clients?.name}</h3>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between px-0">
        <Button
          variant={'link'}
          className="flex has-[>svg]:px-0 text-neutral-700 w-fit p-0 items-center gap-1"
        >
          View Project <ArrowRight size={14} />
        </Button>
        <Badge
          className={cn(
            'capitalize self-end',
            status === 'active' && 'text-blue-600 bg-blue-600/20',
            status === 'completed' && 'text-green-600 bg-green-600/20',
            status === 'on_hold' && 'text-yellow-400 bg-yellow-400/20'
          )}
        >
          {status}
        </Badge>
      </CardFooter>
    </Card>
  );
};
