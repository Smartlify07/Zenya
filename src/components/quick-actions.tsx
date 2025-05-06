import { CommandIcon } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { IncomeForm } from './income-form';
import { cn } from '@/lib/utils';
import { ExpenseForm } from './expense-form';
import { useClickOutside } from '@/hooks/useClickOutside';
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
      <div
        onClick={() => {
          setShowActions((prev) => !prev);
        }}
        className="flex items-center rounded-lg justify-between w-full text-base font-medium px-2 py-2"
      >
        Quick Actions
        <div className="rounded-md flex items-center gap-2 px-4 py-2 bg-neutral-100 text-black font-medium">
          <CommandIcon size={16} /> K
        </div>
      </div>
      <Dialog>
        {showActions && (
          <div
            ref={actionsRef}
            className="bg-white flex flex-col absolute w-full gap-1 rounded-lg shadow-lg border p-2"
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
