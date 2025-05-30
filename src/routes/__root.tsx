import { Toaster } from '@/components/ui/sonner';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
type RouteContext = {};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors />
      <TanStackRouterDevtools />
    </>
  ),
});
