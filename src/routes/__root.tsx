import { DashboardTopNav } from '@/components/dashboard/top-nav';
import Sidebar from '@/components/Sidebar';
import FinanceProvider from '@/context/FinanceProvider';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <main className="flex min-h-screen  gap-0">
      <FinanceProvider>
        <Sidebar />
        <section className="flex-1">
          <DashboardTopNav />
          <Outlet />
        </section>
      </FinanceProvider>
      <TanStackRouterDevtools />
    </main>
  ),
});
