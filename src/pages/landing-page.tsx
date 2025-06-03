// LandingPage.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { joinWaitlist } from '@/lib/waitlist.actions';
import { useState } from 'react';
import { AuthLoader } from '@/components/auth-loader';
import { toast } from 'sonner';
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
  const formSchema = z.object({
    email: z.string().email('Invalid email address'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const handleJoinWaitlist = form.handleSubmit(async (values) => {
    try {
      setLoading(true);
      const { error } = await joinWaitlist(values.email);
      if (error) {
        if (error.code === '23505') {
          toast.error("You've already joined the waitlist");
        } else {
          toast.error('An error occured while adding you to the waitlist.');
        }
        console.error(error);
      } else {
        toast.success(`You're in! We'll send early access details soon.`);
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occured please try again');
      console.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  });
  return (
    <section className="flex font-inter pt-48 pb-20 px-4 md:px-0 justify-center flex-col  gap-8 items-center">
      <header className="flex flex-col md:w-10/12 lg:w-6/12 items-center gap-5">
        <h1 className="text-3xl md:text-6xl font-medium text-primary text-center font-inter">
          The Simple CRM for Freelancers
        </h1>
        <h3 className="md:text-lg font-inter text-secondary-foreground text-center font-normal">
          Zenya helps you stay on top of your clients, income, and expenses —
          all in one clean dashboard.
        </h3>
      </header>

      <div className="w-full items-center justify-center flex flex-col md:flex-row">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinWaitlist();
            }}
            className="flex flex-col md:flex-row items-center gap-4 w-full md:w-11/12 justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" w-full md:w-3/12">
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
            />{' '}
            <Button className="bg-primary w-full md:w-auto flex items-center gap-4 font-inter">
              {loading && <AuthLoader />}
              Join the Waitlist
            </Button>
          </form>
        </Form>
      </div>
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
  const formSchema = z.object({
    email: z.string().email('Invalid email address'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const handleJoinWaitlist = form.handleSubmit(async (values) => {
    try {
      setLoading(true);
      const { error } = await joinWaitlist(values.email);
      if (error) {
        console.error(error);
        toast.error(
          error.message ??
            'An error occurred trying to join the waitlist, please try again'
        );
      } else {
        toast.success(`You're in! We'll send early access details soon.`);
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occured please try again');
      console.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  });
  return (
    <section className="px-6 bg-primary py-20 font-inter text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
        Get early access
      </h2>
      <p className="text-white/70 max-w-xl mx-auto mb-6">
        Join the waitlist and be the first to try the new Zenya.
      </p>
      <div className="w-full items-center justify-center flex flex-col md:flex-row">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinWaitlist();
            }}
            className="flex flex-col md:flex-row items-center gap-4 w-full md:w-11/12 justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" w-full md:w-3/12">
                  <FormControl>
                    <Input
                      className="text-white"
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <Button
              variant={'secondary'}
              onClick={() => {}}
              className="bg-white text-primary w-full md:w-auto font-inter flex items-center gap-4"
            >
              {loading && <AuthLoader />}
              Join the Waitlist
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
