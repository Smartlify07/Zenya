import { CheckCircle, LayoutDashboard, Receipt, Users } from 'lucide-react';

export const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Clients',
      url: '/clients',
      icon: Users,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: CheckCircle,
    },
    {
      title: 'Invoices',
      url: '/invoices',
      icon: Receipt,
    },
  ],
};
