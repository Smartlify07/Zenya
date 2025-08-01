import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import { Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useCreateClient } from '@/services/client.service';
import { useAuth } from '@/context/auth-provider';
import { toast } from 'sonner';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: 'Invalid email address' }),
  company: z.string().min(2, 'Invalid company name'),
  lead_source: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

type ClientForm = {
  buttonText: string;
  redirectURL: string;
};

export function ClientForm({
  buttonText,
  redirectURL,
  className,
  ...props
}: React.ComponentProps<'form'> & ClientForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      lead_source: '',
      status: 'active',
      company: '',
    },
  });
  const router = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const mutateClient = useCreateClient();
  const { user } = useAuth();
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      await mutateClient.mutateAsync({
        newClient: values,
        user_id: user?.id!,
      });
      router({ to: redirectURL });
    } catch (error) {
      toast.error('An error occurred');
      setIsLoading(false);
      throw new Error(
        error instanceof Error ? error.message : 'An error occurred' + error
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Email Address</FormLabel>
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
            name="company"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="ACME Corp .Inc" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lead_source"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Lead Source</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g LinkedIn" {...field} />
                </FormControl>

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
