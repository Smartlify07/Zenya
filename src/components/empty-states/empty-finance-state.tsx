import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FileWarning } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { IncomeForm } from '../forms/income-form';
import { ExpenseForm } from '../forms/expense-form';

export const EmptyStateCard = ({
  title,
  description,
  buttonText,
  action,
  className,
}: {
  title: string;
  description: string;
  buttonText?: string;
  action?: 'income' | 'expense';
  className?: string;
}) => {
  const [selectedAction, setSelectedAction] = useState<
    'income' | 'expense' | null
  >(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <Dialog>
      <Card
        className={cn(
          'flex flex-col font-inter items-center shadow-none justify-center text-center py-8 md:w-6/12',
          className
        )}
      >
        <CardHeader className="w-full">
          <FileWarning className="w-10 mb-4 h-10 text-muted-foreground mx-auto" />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {buttonText && (
          <DialogTrigger
            className={cn(
              `w-28 cursor-pointer flex justify-start items-center`,
              buttonVariants({
                variant: 'default',
                className:
                  'w-28 cursor-pointer flex justify-start items-center',
              })
            )}
            onClick={() => {
              setSelectedAction(action!);
              setShowForm(true);
            }}
          >
            {buttonText}
          </DialogTrigger>
        )}
      </Card>
      {showForm && (
        <DialogContent>
          {selectedAction === 'income' && (
            <IncomeForm setShowForm={setShowForm} />
          )}
          {selectedAction === 'expense' && (
            <ExpenseForm setShowForm={setShowForm} />
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};
