import OnboardingForm from '@/components/onboarding-form';
import { useAuth } from '@/context/auth-provider';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/onboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name;
  return (
    <main className="flex items-center flex-col gap-10 font-inter justify-center min-h-screen">
      <header className="flex items-center justify-center gap-4">
        <h1 className="text-2xl w-8/12 text-center md:text-4xl font-semibold">
          {name
            ? `Hi ${name}, let's know more about your business`
            : 'Welcome to Zenya!'}
        </h1>
      </header>
      <OnboardingForm />
    </main>
  );
}
