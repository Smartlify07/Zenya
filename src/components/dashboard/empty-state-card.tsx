import {
  useSelectedQuickAction,
  type QuickAction,
} from '@/context/selected-quick-action-provider';
import { buttonVariants } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { DialogTrigger } from '../ui/dialog';

export const EmptyStateCard = ({
  title,
  buttonText,
  quickAction,
}: {
  title: string;
  buttonText: string;
  quickAction: QuickAction;
}) => {
  const { setSelectedQuickAction, setShowDialog } = useSelectedQuickAction();
  return (
    <Card className="shadow-2xs gap-3 items-center font-inter">
      <CardHeader className="w-full flex items-center justify-center">
        <h1 className="text-lg font-medium">{title}</h1>
      </CardHeader>
      <CardContent>
        <DialogTrigger
          onClick={() => {
            setSelectedQuickAction(quickAction);
            setShowDialog(true);
          }}
          className={buttonVariants({
            variant: 'default',
          })}
        >
          {buttonText}
        </DialogTrigger>
      </CardContent>
    </Card>
  );
};
