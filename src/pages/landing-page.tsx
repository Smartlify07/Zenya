import Navbar from '@/components/navbar';
import Features from '@/components/pages/landing/features';
import Hero from '@/components/pages/landing/hero';
import ProblemSection from '@/components/pages/landing/problem-section';
import SolutionSection from '@/components/pages/landing/solution-section';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center relative gap-4">
      <Navbar />
      <div className="w-full">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <Features />
      </div>
    </main>
  );
}
