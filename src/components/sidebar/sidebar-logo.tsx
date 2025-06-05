import { Logo } from '../logo';
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar';

export const SidebarLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 py-2">
        <Logo width={30} height={30} />{' '}
        <h1 className="text-lg font-semibold">Zenya</h1>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
