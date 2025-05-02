import { type LucideProps } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  amount: number;
  percentage: number;
  type: 'balance' | 'income' | 'expense';
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};

export const StatCard = ({
  title,
  amount,
  percentage,
  type,
  Icon,
}: StatCardProps) => {
  return (
    <Card className="grid gap-2 font-inter rounded-md shadow-none col-span-1">
      <CardHeader className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className={cn('rounded-md p-3 bg-neutral-50')}>
            <Icon
              className={cn(
                type === 'income' && 'text-purple-600',
                type === 'expense' && 'text-red-600',
                type === 'balance' && 'text-blue-600'
              )}
              size={20}
            />
          </div>
        </div>
        <CardTitle>
          <h1 className="text-base font-semibold text-neutral-900">{title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 mt-1">
        <h3 className="text-neutral-900 text-xl font-semibold">
          ${amount.toLocaleString()}
        </h3>
      </CardContent>
      <CardFooter className="grid gap-2">
        <div className="flex items-center justify-between">
          <p className="text-neutral-500 text-sm font-medium">
            From last month
          </p>
          <p
            className={cn(
              'text-neutral-900 font-semibold',
              type === 'income' && 'text-purple-600',
              type === 'expense' && 'text-red-600',
              type === 'balance' && 'text-blue-800'
            )}
          >
            +{percentage}%
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
