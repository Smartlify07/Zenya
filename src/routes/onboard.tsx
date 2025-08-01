import { ClientForm } from '@/components/client-form';
import OnboardingForm from '@/components/onboarding-form';
import { useAuth } from '@/context/auth-provider';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/onboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name;

  const [onboardingStep, setOnboardingStep] = useState(1);
  const handleNext = () => {
    setOnboardingStep((prev) => prev + 1);
  };

  return (
    <main className="flex items-center flex-col gap-10 font-inter justify-center min-h-screen">
      <header className="flex items-center justify-center gap-4">
        {onboardingStep === 1 && (
          <h1 className="text-2xl w-8/12 text-center md:text-4xl font-semibold">
            {name
              ? `Hi ${name}, let's know more about your business`
              : 'Welcome to Zenya!'}
          </h1>
        )}
        {onboardingStep === 2 && (
          <h1 className="text-2xl  text-center md:text-4xl font-semibold">
            Let's add your first client
          </h1>
        )}
      </header>
      {onboardingStep === 1 && <OnboardingForm onNext={handleNext} />}
      {onboardingStep === 2 && (
        <ClientForm buttonText="Finish" redirectURL="/dashboard" />
      )}
    </main>
  );
}
