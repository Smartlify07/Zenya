import type { LucideProps } from 'lucide-react';

export const SummaryCard = ({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string | number;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <div className="flex flex-col font-inter p-2 rounded-md border border-neutral-200 gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-base text-secondary-foreground font-medium">
          {title}
        </h1>
        {Icon && <Icon className="text-neutral-600" size={14} />}
      </div>
      <h2 className="font-semibold text-3xl text-primary">
        {value.toLocaleString()}
      </h2>
    </div>
  );
};
