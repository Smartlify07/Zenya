import type { Invoice } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { DollarSign, User } from 'lucide-react';
import {
  getClientDetailsFromId,
  getProjectDaysLeftColor,
  getProjectsDaysLeftText,
} from '@/lib/utils/dashboardUtils';
import { clients } from '@/lib/data/clients';
import { getRemainingDays } from '@/lib/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const RecentInvoices = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <section className="w-full md:w-6/12 flex flex-col gap-4">
      <h1 className="text-lg font-medium text-primary">Recent Invoices</h1>

      <div className="grid gap-4">
        {invoices.slice(0, 4).map((invoice) => (
          <RecentInvoicesCard invoice={invoice} />
        ))}
      </div>
    </section>
  );
};

export const RecentInvoicesCard = ({ invoice }: { invoice: Invoice }) => {
  return (
    <Card className="shadow-2xs flex flex-col gap-3">
      <CardHeader className="flex flex-col gap-0.5">
        <div className="flex items-center  w-full justify-between">
          <h1 className="text-base font-medium uppercase text-primary">
            {invoice.id.padStart(2, '0')}
          </h1>

          <Button variant={'link'} className="px-0 text-neutral-600">
            View details
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} className="text-neutral-600" />
          <p className="text-sm text-neutral-700 truncate">
            {getClientDetailsFromId(invoice.client_id as string, clients)?.name}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          ₦
          <span className="text-lg font-semibold text-primary">
            {invoice.amount.toLocaleString('en-NG')}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col py-0 gap-">
        <div className="flex w-full items-center justify-between">
          <Badge
            variant={'outline'}
            className={cn(
              getProjectDaysLeftColor(getRemainingDays(invoice?.due_date))
            )}
          >
            {getProjectsDaysLeftText(getRemainingDays(invoice?.due_date))}
          </Badge>{' '}
          <Badge
            className={cn(
              'text-neutral-600',
              invoice.status === 'paid'
                ? 'bg-green-100 text-green-600'
                : invoice.status === 'overdue'
                ? 'bg-red-100 text-red-600'
                : 'bg-yellow-100 text-yellow-600'
            )}
          >
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};
