import { DashboardTopNav } from '@/components/dashboard/top-nav';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/sonner';
import FinanceProvider from '@/context/FinanceProvider';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <main className="flex min-h-screen  gap-0">
      <FinanceProvider>
        <Sidebar />
        <section className="w-11/12">
          <DashboardTopNav />
          <Outlet />
        </section>
      </FinanceProvider>
      <Toaster richColors />
      <TanStackRouterDevtools />
    </main>
  ),
});
