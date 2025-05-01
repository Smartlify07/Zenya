import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const DashboardTopNav = () => {
  return (
    <section className="flex-1 border-b flex py-2 px-8 font-inter items-center">
      <div className="container flex items-center justify-between w-full">
        <header className="grid gap-1">
          <h1 className="text-xl text-neutral-900">Dashboard</h1>
          <p className="text-sm">View your income and expenses here.</p>
        </header>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>OA</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-neutral-900 font-medium text-base/[100%]">
              Obinna Anosike
            </h1>
            <h3 className="text-neutral-700 text-sm/[100%]">
              obinna@gmail.com
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
