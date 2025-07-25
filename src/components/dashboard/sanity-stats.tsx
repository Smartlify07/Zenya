import { CheckCircle, Clock, Users, type LucideProps } from 'lucide-react';
import { Card, CardTitle } from '../ui/card';

export const SanityStats = ({
  activeClients,
  completedTasks,
}: {
  activeClients: number;
  completedTasks: number;
}) => {
  return (
    <section className="font-inter flex flex-col gap-4 w-full md:w-6/12 bg-white">
      <h1 className="text-xl font-medium text-primary">Sanity Stats</h1>
      <div className="border flex flex-col gap-4 rounded-2xl p-4">
        <StatCard
          Icon={CheckCircle}
          title={'Tasks completed this week'}
          number={completedTasks}
        />
        <StatCard
          Icon={Users}
          title={'Active Clients'}
          number={activeClients}
        />
        <StatCard Icon={Clock} title={'Last break'} number={'2 days ago'} />
      </div>
    </section>
  );
};

const StatCard = ({
  title,
  number,
  Icon,
}: {
  number: number | string;
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <Card className="shadow-none p-4">
      <CardTitle className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-neutral-600" />
          <h2 className="text-sm text-neutral-600 font-normal">{title}</h2>
        </div>
        <h1 className="text-4xl text-primary font-medium">{number}</h1>
      </CardTitle>
    </Card>
  );
};
