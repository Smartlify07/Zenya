import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

type ConfirmationModalProps = {
  title: string;
  description?: string;
  cancel: {
    text: string;
    action: () => void;
  };
  action: {
    text: string;
    action: () => void;
  };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant?: 'default' | 'alert' | 'danger';
};

export const ConfirmationModal = ({
  title,
  description,
  cancel,
  action,
  isOpen,
  setIsOpen,
  variant = 'default',
}: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="font-inter">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancel.action}>
            {cancel.text}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              variant === 'danger' && 'text-white bg-red-700 hover:bg-red-800'
            )}
            onClick={action.action}
          >
            {action.text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
