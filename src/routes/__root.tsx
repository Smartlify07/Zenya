import Sidebar from '@/components/Sidebar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <main className="flex min-h-screen  gap-0">
      <Sidebar />
      <div>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </main>
  ),
});
