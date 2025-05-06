import { Link } from '@tanstack/react-router';
import { Logo } from './logo';
import { QuickActions } from './quick-actions';

const Sidebar = () => {
  const links = [
    {
      title: 'Dashboard',
      link: '/',
    },
    {
      title: 'Expenses',
      link: '/expenses',
    },
  ];
  return (
    <aside className="flex font-inter w-3/12 px-4 py-4 border flex-col gap-4">
      <header className="flex items-center gap-2">
        <Logo /> <h1 className="text-xl text-black">Zenya</h1>
      </header>

      <QuickActions />
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            className="w-full py-2 px-2 rounded-md font-medium text-black "
            activeProps={{ className: 'bg-neutral-200' }}
            to={link.link}
            key={link.link}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
