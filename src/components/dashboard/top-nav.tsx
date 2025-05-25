import type { User } from '@supabase/supabase-js';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export const DashboardTopNav = ({
  user,
  updateUser,
}: {
  user: User | null;
  updateUser: (user: User | null) => void;
}) => {
  return (
    <section className="md:flex-1 border-b flex w-full py-2 px-4 md:px-8 font-inter items-center">
      <div className="container flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-1" />

          <header className="grid gap-1">
            <h1 className="text-xl text-neutral-900">Dashboard</h1>
            <p className="text-sm">View your income and expenses here.</p>
          </header>
        </div>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} alt="@shadcn" />
            <AvatarFallback>
              {user?.user_metadata?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={() => updateUser(null)}
            className="rounded-full size-10"
            variant={'outline'}
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};
