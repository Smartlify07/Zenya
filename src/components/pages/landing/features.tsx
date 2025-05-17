import Feature1 from '@/../public/images/expense-breakdown.png';
import Feature2 from '@/../public/images/feature1.png';
import Feature3 from '@/../public/images/feature2.png';
const features = [
  {
    image: Feature1,
    header: 'Spot Where Your Money Goes — Instantly',
    sub: 'A colorful monthly grid showing which categories eat your cash, so you can control your spending habits effortlessly.',
  },

  {
    image: Feature2,
    header: 'See Your Finances at a Glance',
    sub: 'Instantly know your total balance, income, and expenses with a clean, easy-to-read dashboard.',
  },
  {
    image: Feature3,
    header: 'Log Every Naira You Earn & Spend',
    sub: 'Quickly add incomes and expenses with categories, notes, and dates — no more forgetting where your money went.',
  },
];
export default function Features() {
  return (
    <section className="flex flex-col items-center px-4 py-10 md:py-20 md:px-10 font-inter">
      <div className="max-w-7xl flex flex-col items-center gap-10">
        <header className="flex flex-col items-center md:w-10/12 lg:w-6/12">
          <h1 className="text-2xl md:text-4xl text-center font-medium text-primary">
            Everything you need to stay on top of your freelance finances
          </h1>
        </header>
        <div className="grid md:grid-cols-2 justify-items-center justify-center gap-10 md:gap-10  lg:gap-10 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-5">
              <div className="bg-neutral-50 p-4 rounded-2xl">
                <img
                  src={feature.image}
                  className="object-cover object-left  rounded-xl h-[300px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-primary font-medium text-lg">
                  {feature.header}
                </h3>
                <p className="text-sm text-secondary-foreground">
                  {feature.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
