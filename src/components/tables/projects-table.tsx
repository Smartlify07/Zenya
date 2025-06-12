import type { Client, Project } from '@/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchClientsByIds } from '@/api/supabase/clients';
import type { User } from '@supabase/supabase-js';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export const ProjectsTable = ({
  projects,
  user_id,
}: {
  projects: Project[];
  user_id: User['id'];
}) => {
  const tableHeadClassName = 'text-neutral-600 font-normal text-sm';

  const clientIds = Array.from(
    new Set(projects.map((project) => project.client_id).filter(Boolean))
  );

  const { data: clientsData } = useQuery({
    queryKey: ['clients', clientIds, user_id],
    queryFn: async () => {
      if (!user_id || clientIds.length === 0) return [];

      const { data, error } = await fetchClientsByIds(clientIds, user_id);
      if (error) throw error;
      return data;
    },
    enabled: !!user_id && clientIds.length > 0,
  });

  const clientsMap = new Map<string, Client>(
    clientsData?.map((client) => [client.id as string, client]) || []
  );

  return (
    <Table>
      <TableCaption>A list of your projects</TableCaption>
      <TableHeader>
        <TableRow className="bg-neutral-50">
          <TableHead className={tableHeadClassName}>Project Names</TableHead>
          <TableHead className={tableHeadClassName}>Client</TableHead>
          <TableHead className={tableHeadClassName}>Project Status</TableHead>
          <TableHead className={tableHeadClassName}>Next Due Date</TableHead>
          <TableHead className={tableHeadClassName}>Invoice Status</TableHead>
          <TableHead className={tableHeadClassName}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow className="text-primary text-sm" key={project.id}>
            <TableCell>
              <h1>{project.name}</h1>
            </TableCell>
            <TableCell>{clientsMap.get(project?.client_id)?.name}</TableCell>
            <TableCell className={'flex justify-start items-center'}>
              <Badge
                className={cn(
                  'capitalize',
                  project.status === 'completed' &&
                    'text-green-600 bg-green-600/20',
                  project.status === 'on_hold' && 'text-red-600 bg-red-600/20',
                  project.status === 'active' && 'text-blue-600 bg-blue-600/20'
                )}
              >
                {project.status}
              </Badge>
            </TableCell>
            <TableCell>13/06/2025</TableCell>
            <TableCell>Not paid</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-inter" align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Add Task</DropdownMenuItem>
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
