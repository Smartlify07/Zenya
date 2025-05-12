import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { googleSignIn, login } from '@/lib/auth.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  const formSchema = z.object({
    email: z.string().min(2).max(50).email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const res = await login(data.email, data.password);
    navigate({ to: '/dashboard' });
    setLoading(false);
    navigate({
      to: '/dashboard',
    });
    updateUser(res.user);
  });

  return (
    <main className="flex items-center justify-center font-inter min-h-screen">
      <div className="flex flex-col space-y-10 max-w-sm min-w-sm  items-center justify-center">
        <header className="flex flex-col items-center gap-1">
          <h1 className="text-neutral-800 flex items-center gap-3 text-xl text-center font-semibold">
            Welcome to Zenya <Logo />
          </h1>
          <p className="text-sm text-neutral-500">
            Track your freelance finances with ease.
          </p>
        </header>

        <div className="flex flex-col w-full gap-4">
          <Button
            onClick={async () => {
              await googleSignIn();
            }}
            variant={'outline'}
            className="rounded-sm flex items-center w-full justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>{' '}
            Continue with Google
          </Button>

          <Separator orientation="horizontal" className="h-1" />
        </div>

        <div className="flex flex-col w-full gap-4">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-8"
            >
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="johndoe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-sm flex items-center w-full justify-center"
              >
                {loading && <Loader2 />}
                Continue with Email
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default Login;
