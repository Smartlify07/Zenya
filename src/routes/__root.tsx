import { DashboardTopNav } from '@/components/dashboard/top-nav';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import FinanceProvider from '@/context/FinanceProvider';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <main className="flex min-h-screen  gap-0">
      <FinanceProvider>
        <SidebarProvider className="flex">
          <AppSidebar />
          <section className="flex-1 relative">
            <DashboardTopNav />
            <Outlet />
          </section>
        </SidebarProvider>
      </FinanceProvider>
      <Toaster richColors />
      <TanStackRouterDevtools />
    </main>
  ),
});
