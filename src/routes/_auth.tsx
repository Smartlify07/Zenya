import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import FinanceProvider from '@/context/FinanceProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { DashboardTopNav } from '@/components/dashboard/top-nav';
export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.loading) {
      if (!context.auth.isAuthenticated)
        throw redirect({
          to: '/login',
          search: {
            // Use the current location to power a redirect after login
            // (Do not use `router.state.resolvedLocation` as it can
            // potentially lag behind the actual current location)
            redirect: location.href,
          },
        });
    }
  },
  component: AppLayout,
});

export function AppLayout() {
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
