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
import { createClient } from '@/api/supabase/clients';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth-provider';
import { Button } from '@/components/ui/button';
import { AuthLoader } from '@/components/auth-loader';
import { Textarea } from '@/components/ui/textarea';
export const Route = createFileRoute('/_authenticated/clients/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().min(2).max(50).email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    lead_source: z.string().optional(),
    notes: z.string().optional(),
    status: z.enum(['active', 'inactive'], {
      errorMap: () => ({ message: 'Status must be either active or inactive' }),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      lead_source: '',
      notes: '',
      status: 'active',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await createClient(data, user?.id!);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Successfully created client');
      navigate({
        to: '/clients',
      });
    },
    onError: (error: any) => {
      if (
        error?.message?.includes('violates Row Level Security Policies') ||
        error?.code === '42501'
      ) {
        toast.error(`You don't have permission to perform this action.`);
      } else if (error?.code === '23505') {
        toast.error(`A client with this email already exists.`);
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
          <h1 className="font-medium text-lg text-gray-800">Add New Client</h1>
          <p className="text-gray-600 text-sm">
            Fill in the details below to create a new client profile and start
            managing your relationships.
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
              {/* Client Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Client Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Contact Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        {...field}
                        className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1234567890"
                        {...field}
                        className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Company Field */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Company
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Acme Corp"
                        {...field}
                        className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Lead Source Field */}
              <FormField
                control={form.control}
                name="lead_source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Lead Source
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Website, Referral, etc."
                        {...field}
                        className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
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
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Notes Field (full width) */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    {' '}
                    {/* Make notes span both columns */}
                    <FormLabel className="text-gray-700 font-medium">
                      Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any relevant notes about the client."
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
                {mutation.isPending && <AuthLoader />} Add Client
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
