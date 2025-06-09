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
import { createClient } from '@/api/supabase/clients';
import { toast } from 'sonner';
import { AuthLoader } from '../auth-loader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedQuickAction } from '@/context/selected-quick-action-provider';
import { DialogTitle } from '../ui/dialog';
export const ClientForm = ({ user_id }: { user_id: string | undefined }) => {
  const queryClient = useQueryClient();
  const { setShowDialog } = useSelectedQuickAction();
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
      return await createClient(data, user_id!);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Successfully created client');
      setShowDialog(false);
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
    <div className="flex flex-col w-full font-inter gap-4">
      <DialogTitle className="text-lg font-medium text-primary">
        Add Client
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
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lead_source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead source</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Source A." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="rounded-sm flex items-center w-full justify-center"
          >
            {mutation.isPending && <AuthLoader />} Add client
          </Button>
        </form>
      </Form>
    </div>
  );
};
