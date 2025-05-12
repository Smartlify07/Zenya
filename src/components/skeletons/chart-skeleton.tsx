import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExpenseIncomeChartSkeleton() {
  return (
    <Card className="shadow-none md:w-6/12">
      <CardHeader>
        <Skeleton className="h-5 w-40" /> {/* Title */}
        <Skeleton className="h-4 w-32" /> {/* Description */}
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] flex items-center justify-center bg-muted rounded-md">
          <Skeleton className="w-full h-full" /> {/* Chart Placeholder */}
        </div>
      </CardContent>
    </Card>
  );
}
