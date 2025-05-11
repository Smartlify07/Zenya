import { Toaster } from '@/components/ui/sonner';
import type { AuthContextType } from '@/context/auth-provider';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
type RouteContext = {
  auth: AuthContextType;
};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors />
      <TanStackRouterDevtools />
    </>
  ),
});
