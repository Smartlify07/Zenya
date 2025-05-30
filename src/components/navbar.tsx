import { useEffect, useState } from 'react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        `flex rounded-2xl top-10 w-11/12 md:w-11/12 z-40 items-center fixed font-inter justify-between px-5 py-4 border shadow-xs`,
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b'
          : 'bg-transparent'
      )}
    >
      <h1 className="text-lg flex items-center gap-1 text-primary font-medium">
        <Logo /> Zenya
      </h1>

      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            navigate({ to: '/' });
          }}
        >
          Sign Up
        </Button>
        <Button
          onClick={() => {
            navigate({ to: '/' });
          }}
          variant="outline"
        >
          Sign In
        </Button>
      </div>
    </nav>
  );
}
