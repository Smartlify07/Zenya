import type { Client } from '@/types';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { EmptyStateCard } from './empty-state-card';
import { buttonVariants } from '../ui/button';
import { useSelectedQuickAction } from '@/context/selected-quick-action-provider';
import { DialogTrigger } from '@radix-ui/react-dialog';

export const RecentClients = ({ clients }: { clients: Client[] }) => {
  const { setSelectedQuickAction, setShowDialog } = useSelectedQuickAction();
  return (
    <section className="w-full md:w-6/12 flex flex-col gap-4">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-lg font-medium text-primary">Recent Clients</h1>

        <DialogTrigger
          className={buttonVariants({
            variant: 'outline',
          })}
          onClick={() => {
            setSelectedQuickAction('client');
            setShowDialog(true);
          }}
        >
          Add client
        </DialogTrigger>
      </div>

      {clients.length === 0 && (
        <EmptyStateCard
          quickAction={'client'}
          title="No client data available"
          buttonText="Add your first client"
        />
      )}
      <div className="grid gap-4">
        {clients.slice(0, 6).map((client) => (
          <RecentClientsCard key={client?.id} {...client} />
        ))}
      </div>
    </section>
  );
};

export const RecentClientsCard = ({
  name,
  email,
  company,
  status,
  avatar,
}: Client) => {
  return (
    <Card className="shadow-none flex flex-col px-4 gap-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-base font-medium">{name}</h1>
          <p className="text-sm truncate text-neutral-600">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <h3 className="text-sm flex items-center gap-1">
          <Building2 size={14} className="text-neutral-600" />
          {company || 'No Company'}
        </h3>

        <Badge
          className={cn(
            'capitalize',
            status === 'active' && 'text-green-600 bg-green-600/20',
            status === 'inactive' && 'text-red-600 bg-red-600/20'
          )}
        >
          {status}
        </Badge>
      </div>
    </Card>
  );
};
