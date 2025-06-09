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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useClients } from '@/hooks/useClients';
import type { Client } from '@/types';
import { createProject } from '@/api/supabase/projects';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
export const ProjectForm = ({ user_id }: { user_id: string | undefined }) => {
  const queryClient = useQueryClient();
  const { setShowDialog } = useSelectedQuickAction();
  const clients = useClients();

  // Form schema
  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    description: z.string(),
    client_id: z.string().min(2, 'Client must be present'),
    start_date: z.date({
      required_error: 'Start date is required',
    }),
    end_date: z.date({
      required_error: 'End date is required',
    }),
    status: z.enum(['active', 'completed', 'on_hold'], {
      errorMap: () => ({
        message: 'Status must be either active, complete or on hold',
      }),
    }),
  });

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      client_id: '',
      start_date: new Date(),
      end_date: new Date(),
      status: 'active',
    },
  });

  // Mutation calls
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await createProject(data, user_id!);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Your project has been created!');
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

  // Submit

  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      await mutation.mutateAsync(formData);
    } catch (error: any) {
      console.error('Unexpected error during mutation call:', error);
    }
  });

  // JSX

  return (
    <div className="flex flex-col w-full font-inter gap-4">
      <h1 className="text-lg font-medium text-primary">Add Project</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client for this project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.data?.data?.map((client: Client) => (
                      <SelectItem key={client.id} value={client.id as string}>
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
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
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
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>End Date</FormLabel>
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
                      <SelectValue placeholder="Select a client for this project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['active', 'completed', 'on_hold'].map((status) => (
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
            {mutation.isPending && <AuthLoader />} Add project
          </Button>
        </form>
      </Form>
    </div>
  );
};
