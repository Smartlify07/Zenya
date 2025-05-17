import Mockup from '@/../public/images/9_1x_shots_so.png';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="flex pt-48 pb-20 px-4 md:px-0 justify-center flex-col items-center">
      <header className="flex flex-col md:w-10/12 lg:w-6/12 items-center gap-5">
        <h1 className="text-3xl md:text-5xl font-medium text-primary text-center font-inter">
          Most freelancers don’t track their finances, until it’s too late
        </h1>
        <h3 className="md:text-lg font-inter text-secondary-foreground text-center font-normal">
          Zenya helps you stay on top of your income, expenses, and cashflow
          without spreadsheets or complex apps.
        </h3>

        <Button className="bg-primary font-inter">Get Started</Button>
      </header>

      <div className="w-full relative">
        <img className="object-cover" src={Mockup} />
      </div>
    </section>
  );
};

export default Hero;
