import { supabase } from '@/lib/supabase';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.log(true);
      console.log(session);
      throw redirect({ to: '/' });
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('id', session.user.id)
      .maybeSingle();

    if (
      !profile?.onboarding_complete &&
      location.pathname !== '/profile-setup'
    ) {
      throw redirect({ to: '/' });
    }
    if (profileError) {
      throw new Error('Error occurred trying to get your profile');
    }
    if (error) {
      console.error(error.message);
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
