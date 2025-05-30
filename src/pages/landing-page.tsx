// LandingPage.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyZenyaSection />
      <BuiltForSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="flex font-inter pt-48 pb-20 px-4 md:px-0 justify-center flex-col items-center">
      <header className="flex flex-col md:w-10/12 lg:w-6/12 items-center gap-5">
        <h1 className="text-3xl md:text-6xl font-medium text-primary text-center font-inter">
          The Simple CRM for Freelancers
        </h1>
        <h3 className="md:text-lg font-inter text-secondary-foreground text-center font-normal">
          Zenya helps you stay on top of your clients, income, and expenses —
          all in one clean dashboard.
        </h3>

        <div className="flex items-center gap-4">
          <Input placeholder="johndoe@example.com" />
          <Button
            onClick={() => {
              navigate({ to: '/signup' });
            }}
            className="bg-primary font-inter"
          >
            Join Waitlist
          </Button>
        </div>
      </header>
    </section>
  );
}

function WhyZenyaSection() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto grid gap-12 font-inter">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        Why Zenya?
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Track clients without spreadsheets',
            desc: 'See who paid, who ghosted, and who needs a follow-up — all at a glance.',
          },
          {
            title: 'Know where your money’s going',
            desc: 'Log income and expenses in seconds. See your profit in real-time.',
          },
          {
            title: 'Stay organized, stay paid',
            desc: 'From projects to payments, Zenya keeps your freelance business in one place.',
          },
        ].map((item, i) => (
          <Card key={i} className="border border-neutral-300 shadow-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function BuiltForSection() {
  return (
    <section className="px-6 font-inter py-20 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl text-primary md:text-4xl font-semibold mb-6">
        Built for freelancers, by freelancers
      </h2>
      <p className="text-neutral-500 max-w-2xl mx-auto mb-10">
        We’re rebuilding Zenya from the ground up — based on real conversations
        with freelancers who hate messy spreadsheets and bloated tools. You
        don’t need 10 apps. You need one that just works.
      </p>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-6 py-20 bg-neutral-900 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Get early access
      </h2>
      <p className="text-neutral-400 max-w-xl mx-auto mb-6">
        Join the waitlist and be the first to try the new Zenya. Early users get{' '}
        <strong>3 months free</strong> and exclusive features before public
        launch.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <Input
          placeholder="Enter your email"
          className="bg-neutral-800 border-neutral-700"
        />
        <Button className="w-full sm:w-auto">Join the Waitlist</Button>
      </div>
    </section>
  );
}
