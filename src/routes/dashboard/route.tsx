import { AppSidebar } from '@/components/app-sidebar';
import { DashboardTopNav } from '@/components/dashboard/top-nav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AuthProvider } from '@/context/auth-provider';
import FinanceProvider from '@/context/FinanceProvider';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen gap-0">
      <AuthProvider>
        <FinanceProvider>
          <SidebarProvider className="flex">
            <AppSidebar variant="sidebar" />
            <SidebarInset>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 md:gap-6">
                  <DashboardTopNav />
                  <Outlet />
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </FinanceProvider>
      </AuthProvider>
    </main>
  );
}
