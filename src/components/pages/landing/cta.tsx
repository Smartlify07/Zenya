import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <section className="flex flex-col items-center px-6 py-10 md:py-20 md:px-10 font-inter">
      <div className="max-w-7xl flex flex-col w-full items-center gap-6">
        <header className="flex flex-col gap-4 items-center md:w-10/12 lg:w-7/12">
          <h1 className="text-2xl md:text-6xl text-center font-medium text-primary">
            Ditch Spreadsheets, Track Smarter.
          </h1>
          <p className="text-center text-secondary-foreground">
            Zenya helps you track income & expenses effortlessly, so you can
            focus on what matters <span className="text-xl">-- your work.</span>
          </p>
        </header>
        <Button onClick={() => {}}>Get Started</Button>
      </div>
    </section>
  );
}
