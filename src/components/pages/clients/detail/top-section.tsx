import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Client } from '@/types';
import { Building2 } from 'lucide-react';

export const TopSection = ({
  client,
}: {
  client: Client | undefined | null;
}) => {
  console.log(client);
  return (
    <section className="border-r font-inter flex flex-col gap-4">
      <header className="flex w-full py-5 h-[150px] relative bg-linear-to-tr from-neutral-50 to-neutral-100 items-center gap-4">
        <Avatar className="size-28 absolute top-[100px] border left-[80px] rounded-md">
          {client?.avatar && <AvatarImage src={client?.avatar} />}
          <AvatarFallback className="text-3xl bg-neutral-100 rounded-md uppercase">
            {client?.name?.charAt(0)}.{client?.name?.charAt(1)}
          </AvatarFallback>
        </Avatar>
      </header>

      <section className="flex flex-col gap-2 mt-24 px-20">
        <h1 className="text-2xl font-medium text-primary">{client?.name}</h1>

        <div className="flex items-center gap-3">
          <p className="text-sm flex items-center gap-1 text-neutral-500">
            <Building2 size={16} />
            {client?.company}
          </p>
          <span className="rounded-full size-1 bg-neutral-300"></span>
          <p className="text-sm text-neutral-500">{client?.email}</p>
          <span className="rounded-full size-1 bg-neutral-300"></span>
          <p className="text-sm text-neutral-500">{client?.phone}</p>
          <span className="rounded-full size-1 bg-neutral-300"></span>

          <Badge
            className={cn(
              'capitalize',
              client?.status === 'active' && 'text-green-600 bg-green-600/20',
              client?.status === 'inactive' && 'text-red-600 bg-red-600/20'
            )}
          >
            {client?.status}
          </Badge>
        </div>
      </section>

      <section className="flex px-20 items-center gap-4">
        <Button>Edit Profile</Button>
      </section>
    </section>
  );
};
