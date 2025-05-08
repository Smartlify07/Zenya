import { LayoutDashboard, PiggyBank, Wallet } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { Link } from '@tanstack/react-router';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Expenses',
    url: '/expenses',
    icon: Wallet,
  },
  {
    title: 'Income',
    url: '/income',
    icon: PiggyBank,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="font-inter border">
      <SidebarHeader>
        <div className="flex w-full py-2 font-semibold items-center gap-4">
          <Logo /> Zenya
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      activeProps={{
                        className:
                          'bg-white text-black py-2 font-medium shadow-xs border',
                      }}
                      className="text-base rounded-md"
                      to={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
