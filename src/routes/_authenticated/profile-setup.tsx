import { AuthLoader } from '@/components/auth-loader';
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
import { useAuth } from '@/context/auth-provider';
import { updateProfile } from '@/lib/profile.actions';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/_authenticated/profile-setup')({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { user } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();
  const formSchema = z.object({
    business_name: z.string().min(2, 'Enter at least 2 characters'),
    logo: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: '',
      logo: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      await updateProfile(
        {
          businessName: data.business_name,
          onboarding_complete: true,
        },
        user?.id
      );
      if (file && user) {
        const path = `${user.id}/${file.name}`;
        const { error } = await supabase.storage
          .from('business-logos')
          .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error(error);
        }
      }
      toast.success('Profile updated successfully, redirecting...');
      await router.invalidate();

      await navigate({
        to: '/',
      });
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  });

  return (
    <main className="h-screen flex items-center font-inter border justify-center">
      <div className="container flex items-center flex-col py-10 px-4 max-w-[1440px]">
        <header className="flex flex-col gap-2">
          <h1 className="text-primary text-center font-semibold gap-2 flex items-center justify-center text-2xl">
            Welcome to Zenya <Logo />
          </h1>
          <p className="text-secondary-foreground text-center text-base">
            Let's quickly setup your business profile
          </p>
        </header>

        <div className="flex mt-10 flex-col md:w-5/12 w-full">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        type="business_name"
                        placeholder="Acme corp."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="logo">Logo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Choose a file"
                        id="picture"
                        type="file"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (selectedFile) setFile(selectedFile);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5"></div>

              <Button
                type="submit"
                className="rounded-sm flex items-center w-full justify-center"
              >
                {loading && <AuthLoader />}
                Finish
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
