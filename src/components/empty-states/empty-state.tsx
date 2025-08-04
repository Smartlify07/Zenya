import { type LucideProps } from 'lucide-react';
import { Button } from '../ui/button';

const EmptyState = ({
  Icon,
  title,
  description,
  action,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  action?: {
    action: () => void;
    text: string;
  };
}) => {
  return (
    <div className="flex font-inter flex-col gap-4">
      <Icon size={36} className="self-center" />
      <div className="grid gap-2">
        <h1 className="text-2xl text-center font-medium">{title}</h1>
        <p className="text-accent-foreground/50 text-center">{description}</p>
      </div>
      {action && (
        <Button className="self-center mt-2" onClick={action?.action}>
          {action?.text}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
