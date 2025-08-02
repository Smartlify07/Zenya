import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useGetClients } from '@/services/client.service';
import { useAuth } from '@/context/auth-provider';
import { useEffect, useState } from 'react';
import { useCreateProject, useEditProject } from '@/services/projects.service';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  client_id: z.string({
    message: 'Invalid email address',
    required_error: 'A client for this project is required',
  }),
  status: z.enum(['active', 'completed', 'on_hold'], {
    required_error: 'Project status is required',
    message: 'Invalid project status',
  }),
  start_date: z.coerce.date({
    message: 'Invalid date',
    required_error: 'A start date for the project is required',
    invalid_type_error: 'Invald project date',
  }),
  description: z.string().optional(),
  end_date: z.coerce.date({
    required_error: "The project's end date is required",
    invalid_type_error: 'Invald project date',
  }),
});

type ProjectForm = {
  buttonText: string;
  redirectURL: string;
  initialValues?: z.infer<typeof formSchema>;
  project_id?: string;
};

export function ProjectForm({
  buttonText,
  initialValues,
  redirectURL,
  project_id,
  className,
  ...props
}: React.ComponentProps<'form'> & ProjectForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      client_id: initialValues?.client_id ?? '',
      status: initialValues?.status ?? 'active',
      description: initialValues?.description ?? '',
      start_date: initialValues?.start_date! ?? new Date(),
      end_date: initialValues?.end_date! ?? new Date(),
    },
  });

  const router = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const clientsResponse = useGetClients();

  const { user } = useAuth();

  const mutateProject = useCreateProject();

  const editMutation = useEditProject();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (!initialValues) {
        await mutateProject.mutateAsync({
          data: { ...values, user_id: user?.id! },
          user_id: user?.id!,
        });
      } else {
        await editMutation.mutateAsync({
          data: { ...values, id: project_id },
          user_id: user?.id!,
        });
      }

      router({ to: redirectURL });
    } catch (error) {
      toast.error('An error occurred');
      setIsLoading(false);
      console.error(error);
      throw new Error(
        error instanceof Error ? error.message : 'An error occurred' + error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, [initialValues, form.reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g Machine Learning Website"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem className="grid gap-3  w-full">
                <FormLabel>Client</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Select a client to display'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border w-full">
                    {clientsResponse.data?.map((client) => (
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
            name="status"
            render={({ field }) => (
              <FormItem className="grid gap-3  w-full">
                <FormLabel>Project Status</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border ">
                    {['active', 'completed', 'on_hold'].map((status) => (
                      <SelectItem key={status} value={status as string}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-6">
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
                            'w-[240px] pl-3 text-left font-normal',
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
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
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
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
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
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid gap-3  w-full">
                <FormLabel>Project Description</FormLabel>

                <Textarea
                  placeholder="Extra project details"
                  className="resize-none"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full flex items-center gap-2">
            {isLoading && <Loader2 className="animate-spin" />} {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
