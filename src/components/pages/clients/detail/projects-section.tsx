import { ProjectForm } from '@/components/forms/project-form';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import type { User } from '@supabase/supabase-js';
import { FolderKanban, Plus } from 'lucide-react';

export const ProjectsSection = ({
  projects,
  user_id,
}: {
  user_id: User['id'];
  projects: Project[] | undefined;
}) => {
  return (
    <section>
      <Card className="shadow-2xs px-4 font-inter">
        <CardTitle className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-medium text-lg">Projects</h1>
            <FolderKanban size={16} className="text-neutral-600" />
          </div>

          <Dialog>
            <DialogTrigger
              className={cn(
                buttonVariants(),
                'w-fit self-end flex items-center gap-2'
              )}
            >
              <Plus /> New Project
            </DialogTrigger>

            <DialogContent>
              <ProjectForm user_id={user_id} />
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardContent className="flex flex-col gap-4 px-0">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex border justify-between rounded-md p-4 gap-1"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-medium">{project.name}</h1>
                <p className="text-sm text-neutral-500">
                  {project.description}
                </p>
              </div>

              <Badge
                className={cn(
                  'capitalize self-end',
                  project.status === 'completed' &&
                    'text-green-600 bg-green-600/20',
                  project.status === 'on_hold' && 'text-red-600 bg-red-600/20',
                  project.status === 'active' && 'text-blue-600 bg-blue-600/20'
                )}
              >
                {project.status}
              </Badge>
            </div>
          ))}

          {projects?.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-medium">No projects yet.</h1>
              <h3 className="text-base font-normal">
                Start by adding a project to track work with this client.
              </h3>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
