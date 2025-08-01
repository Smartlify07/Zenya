import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUpWithEmail } from '@/services/signup.service';
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
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { createProfile } from '@/services/profile.service';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: 'Email address is required' }),
  password: z.string().min(8),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  });
  const router = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { data: signupData, error: signupError } = await signUpWithEmail(
      values.email,
      values.password
    );

    if (signupError) {
      setIsLoading(false);
      toast.error('An error occurred signing you up.');
      throw new Error(signupError.message);
    }
    const user = signupData.user;

    if (user) {
      const { error: profileError } = await createProfile(
        {
          email: values.email,
          name: values.name,
          business_name: '',
          phone_number: '',
        },
        user.id
      );
      if (profileError) {
        setIsLoading(false);
        toast.error('An error occurred ');
        throw new Error(profileError.message);
      }
      await router({ to: '/onboard' });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Introduce yourself to get started
          </p>
        </div>
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
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full flex items-center gap-2">
            {isLoading && <Loader2 className="animate-spin" />} Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}
