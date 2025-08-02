import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Client, Project } from '@/types';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useDeleteProject, useGetProjects } from '@/services/projects.service';
import { ProjectBadge } from './project-badge';

const ProjectList = ({ userId }: { userId: string }) => {
  const router = useNavigate();
  const { data, error, isLoading } = useGetProjects(userId);
  const deleteMutation = useDeleteProject();
  const projects = data;

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleDelete = async (client_id: Client['id']) => {
    deleteMutation.mutate(client_id, {
      onSuccess: () => {
        toast.success('Project deleted successfully');
      },
      onError: (error) => {
        console.error(error);
        toast.error('An error occurred deleting that project');
      },
    });
  };

  return (
    <div className="px-10 max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="font-inter">
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project: Project) => (
            <TableRow className="font-inter" key={project.id}>
              <TableCell>{project?.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {project?.clients?.name}
              </TableCell>
              <TableCell>
                <ProjectBadge status={project.status} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-inter" align="end">
                    <DropdownMenuLabel className="font-inter">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        router({ to: `/projects/${project.id}/edit` });
                      }}
                    >
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDelete(project.id);
                      }}
                    >
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {error && <h1 className="text-base font-inter font-medium">{error}</h1>}
    </div>
  );
};

export default ProjectList;
