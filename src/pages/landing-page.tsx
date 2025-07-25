import { Button } from '@/components/ui/button';
import { useNavigate, useRouter } from '@tanstack/react-router';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <HeroSection />
    </main>
  );
}

function HeroSection() {
  const router = useNavigate();
  return (
    <section className="py-20 flex items-center font-inter flex-col gap-4">
      <h1 className="font-inter text-6xl w-7/12 font-medium text-center text-neutral-50 tracking-tight">
        The CRM built for freelancers who value their sanity
      </h1>
      <p className="text-secondary/70 text-base font-inter text-center w-6/12">
        Stop juggling Excel sheets and Notion pages. Zenya combines client
        management, project tracking, and mental health support in one
        beautifully simple tool.
      </p>

      <div className="flex items-center gap-6 mt-10">
        <Button
          onClick={() => {
            router({ to: '/signup' });
          }}
          className="bg-neutral-50 hover:bg-neutral-100 text-neutral-950 w-full"
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
}
