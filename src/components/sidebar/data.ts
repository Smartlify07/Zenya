import {
  CheckCircle,
  FolderKanban,
  LayoutDashboard,
  Receipt,
  Users,
} from 'lucide-react';

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
      title: 'Projects',
      url: '/projects',
      icon: FolderKanban,
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
