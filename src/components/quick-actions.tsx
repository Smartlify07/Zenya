import { PlusCircleIcon } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { IncomeForm } from './forms/income-form';
import { cn } from '@/lib/utils';
import { ExpenseForm } from './forms/expense-form';
import { useClickOutside } from '@/hooks/useClickOutside';
import { SidebarMenuButton } from './ui/sidebar';
export const QuickActions = () => {
  const [selectedAction, setSelectedAction] = useState<
    'income' | 'expense' | null
  >(null);
  const [showActions, setShowActions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  useClickOutside(actionsRef, () => setShowActions(false));
  return (
    <div className="relative">
      <SidebarMenuButton
        onClick={() => {
          setShowActions((prev) => !prev);
        }}
        tooltip="Quick Create"
        className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
      >
        <PlusCircleIcon />
        <span>Quick Create</span>
      </SidebarMenuButton>
      <Dialog>
        {showActions && (
          <div
            ref={actionsRef}
            className="bg-white -right-10 z-20  flex flex-col absolute w-full gap-1 rounded-lg shadow-lg border p-2"
          >
            <DialogTrigger
              onClick={() => {
                setSelectedAction('income');
                setShowForm(true);
              }}
              className={cn(
                `w-full cursor-pointer flex justify-start items-center`,
                buttonVariants({
                  variant: 'ghost',
                  className:
                    'w-full cursor-pointer flex justify-start items-center',
                })
              )}
            >
              Add Income
            </DialogTrigger>
            <DialogTrigger
              onClick={() => {
                setSelectedAction('expense');
                setShowForm(true);
              }}
              className={cn(
                `w-full cursor-pointer flex justify-start items-center`,
                buttonVariants({
                  variant: 'ghost',
                  className:
                    'w-full cursor-pointer flex justify-start items-center',
                })
              )}
            >
              Add Expense
            </DialogTrigger>
          </div>
        )}

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
    </div>
  );
};
