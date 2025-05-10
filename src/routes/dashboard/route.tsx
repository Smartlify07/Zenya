import { AppSidebar } from '@/components/app-sidebar';
import { DashboardTopNav } from '@/components/dashboard/top-nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import FinanceProvider from '@/context/FinanceProvider';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen gap-0">
      <FinanceProvider>
        <SidebarProvider className="flex">
          <AppSidebar />
          <section className="md:flex-1 relative">
            <DashboardTopNav />
            <Outlet />
          </section>
        </SidebarProvider>
      </FinanceProvider>
    </main>
  );
}
