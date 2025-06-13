import { Bell } from 'lucide-react';

export const TopNav = () => {
  const text = 'Dashboard';
  return (
    <nav className="flex items-center font-inter justify-between p-4 bg-white border-b-neutral-200 border-b ">
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-primary font-medium">{text}</h1>
      </div>
      <button className="rounded-md border flex items-center justify-center border-neutral-300 size-8">
        <Bell size={14} />
      </button>
    </nav>
  );
};
('');
