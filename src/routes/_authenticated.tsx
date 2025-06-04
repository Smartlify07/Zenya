import { supabase } from '@/lib/supabase';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.log(true);
      console.log(session);
      throw redirect({ to: '/' });
    }

    if (error) {
      console.error(error.message);
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
