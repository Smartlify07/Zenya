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
import { ConfirmationModal } from './confirmation-modal';
import { useState } from 'react';

const ProjectList = ({ userId }: { userId: string }) => {
  const router = useNavigate();
  const { data, error, isLoading } = useGetProjects(userId);
  const deleteMutation = useDeleteProject();
  const projects = data;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

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
                    <DropdownMenuItem>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProjectId(project.id as string);
                          setIsOpen(true);
                        }}
                      >
                        Delete project
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        variant="danger"
        title="Delete this Project?"
        description="This will permanently remove this project and any related data. This action cannot be undone."
        action={{
          text: 'Delete Project',
          action: () => handleDelete(selectedProjectId as string),
        }}
        cancel={{
          action: () => {
            setIsOpen(false);
            setSelectedProjectId(null);
          },
          text: 'Cancel',
        }}
      />

      {error && <h1 className="text-base font-inter font-medium">{error}</h1>}
    </div>
  );
};

export default ProjectList;
