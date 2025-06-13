import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth-provider';
import { Button } from '@/components/ui/button';
import { AuthLoader } from '@/components/auth-loader';
import { Textarea } from '@/components/ui/textarea';
import type { Client } from '@/types';
import { useClients } from '@/hooks/useClients';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { createProject } from '@/api/supabase/projects';
export const Route = createFileRoute('/_authenticated/projects/create')({
  component: CreateProjectRoute,
});

function CreateProjectRoute() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const clients = useClients();

  const navigate = useNavigate();
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

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await createProject(data, user?.id!);
    },

    onSuccess: ({ data }) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Successfully created Project ${form.getValues().name}`);
      navigate({
        to: '/projects',
      });
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

  return (
    <main className="px-5 pb-10">
      <div className="flex flex-col gap-10 font-inter border shadow-xs rounded-lg px-5 py-5 w-full max-w-[1440px]">
        <header className="flex flex-col">
          <h1 className="font-medium text-lg text-gray-800">Add New Project</h1>
          <p className="text-gray-600 text-sm">
            Enter the details for your new project to begin managing it.
          </p>
        </header>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {/* Project Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Web 3 Project"
                        {...field}
                        className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Contact Email Field */}
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
                          <SelectItem
                            key={client.id}
                            value={client.id as string}
                          >
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
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

              {/* Company Field */}
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

              {/* Status Field (Select Dropdown) */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-md w-full border-gray-300">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="font-inter">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Complete</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* description Field (full width) */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    {/* Make description span both columns */}
                    <FormLabel className="text-gray-700 font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any relevant description about the project."
                        {...field}
                        className="min-h-[100px] rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 mt-6">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-2 rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
                onClick={() => form.reset()} // Optionally reset form on cancel
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={mutation.isPending} // Disable button while mutation is pending
              >
                {mutation.isPending && <AuthLoader />} Add Project
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
