import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async () => {},
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
