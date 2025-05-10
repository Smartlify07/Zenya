import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

export const DashboardTopNav = () => {
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
      </div>
    </section>
  );
};
