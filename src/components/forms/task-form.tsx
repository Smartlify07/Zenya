import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { AuthLoader } from '../auth-loader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedQuickAction } from '@/context/selected-quick-action-provider';
import { DialogTitle } from '../ui/dialog';
import { createTask } from '@/api/supabase/tasks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { useClients } from '@/hooks/useClients';
import { useProjects } from '@/hooks/useProjects';
import type { Client, Project } from '@/types';
export const TaskForm = ({ user_id }: { user_id: string | undefined }) => {
  const queryClient = useQueryClient();
  const { setShowDialog } = useSelectedQuickAction();
  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    description: z.string().optional(),
    due_date: z.date({
      required_error: 'Task due date is required',
    }),
    status: z.enum(['todo', 'in_progress', 'completed'], {
      errorMap: () => ({ message: 'Status must be either todo, ' }),
    }),
    client_id: z.string().min(2, 'Client is required'),
    project_id: z.string().min(2, 'project is required'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      due_date: undefined,
      status: 'todo',
      project_id: '',
      client_id: '',
    },
  });


  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const { due_date, ...rest } = data;
      const payload = { ...rest, due_date: due_date.toISOString() };
      return await createTask(payload, user_id!);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Successfully created task');
      setShowDialog(false);
    },
    onError: (error: any) => {
      if (
        error?.message?.includes('violates Row Level Security Policies') ||
        error?.code === '42501'
      ) {
        toast.error(`You don't have permission to perform this action.`);
      } else {
        toast.error(
          'An unexpected error occurred. Please try again or contact support.'
        );
      }
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      await mutation.mutateAsync(formData);
    } catch (error: any) {
      console.error('Unexpected error during mutation call:', error);
    } finally {
    }
  });

  const clients = useClients();
  const projects = useProjects();
  return (
    <div className="flex flex-col w-full font-inter gap-4">
      <DialogTitle className="text-lg font-medium text-primary">
        Add Task
      </DialogTitle>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project for this task" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects?.data?.data?.map((project: Project) => (
                      <SelectItem value={project.id as string}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client for this task" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients?.data?.data?.map((client: Client) => (
                      <SelectItem value={client.id as string}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['todo', 'completed', 'in_progress'].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="rounded-sm flex items-center w-full justify-center"
          >
            {mutation.isPending && <AuthLoader />} Add Task
          </Button>
        </form>
      </Form>
    </div>
  );
};
