import { supabase } from '@/lib/supabase';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          supabase.auth.signOut();
          navigate({
            to: '/',
          });
        }}
      >
        Logout
      </button>
    </div>
  );
}
