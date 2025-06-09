import { TopNav } from '@/components/dashboard/top-nav';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-provider';
import { SelectedQuickActionProvider } from '@/context/selected-quick-action-provider';
import { supabase } from '@/lib/supabase';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: AppLayout,
  beforeLoad: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session?.user) {
      throw redirect({ to: '/' });
    }

    if (error) {
      console.error(error.message);
    }
  },
});

function AppLayout() {
  const { user } = useAuth();
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="flex flex-col gap-6 w-full">
          <TopNav />
          <SelectedQuickActionProvider>
            <Outlet />
          </SelectedQuickActionProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
