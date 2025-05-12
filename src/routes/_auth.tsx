import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import FinanceProvider from '@/context/FinanceProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { DashboardTopNav } from '@/components/dashboard/top-nav';
import { useAuth } from '@/hooks/use-auth';

export const Route = createFileRoute('/_auth')({
  component: AppLayout,
});

export function AppLayout() {
  const { user, loading } = useAuth();
  if (!loading && !user?.id) {
    return <Navigate to="/login" />;
  }
  return (
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
  );
}
