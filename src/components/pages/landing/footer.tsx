import { Logo } from '@/components/logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center md:flex-row md:items-center py-10 font-inter justify-between px-4 md:px-10 gap-4">
      <h1 className="flex items-center gap-2">
        <Logo /> Zenya
      </h1>

      <ul className="flex items-center gap-2 text-neutral-700 text-sm">
        <a href="https://x.com/Smartlify01" className="">
          Contact us
        </a>
        <a href="/privacy">Privacy</a>
      </ul>

      <p className="text-secondary-foreground text-sm">
        &copy; Zenya {currentYear}
      </p>
    </footer>
  );
}
