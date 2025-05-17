import LandingPage from '@/pages/landing-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async () => {},
});

function RouteComponent() {
  return <LandingPage />;
}
