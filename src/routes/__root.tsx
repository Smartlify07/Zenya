import { DashboardTopNav } from '@/components/dashboard/top-nav';
import Sidebar from '@/components/Sidebar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <main className="flex min-h-screen  gap-0">
      <Sidebar />
      <section className="flex-1">
        <DashboardTopNav />
        <Outlet />
      </section>
      <TanStackRouterDevtools />
    </main>
  ),
});
