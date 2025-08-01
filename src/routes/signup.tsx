import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@/components/signup-form';
import { Logo } from '@/components/logo';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});

export default function SignupPage() {
  return (
    <div className="grid min-h-svh font-inter lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Logo />
            </div>
            Zenya
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block"></div>
    </div>
  );
}
