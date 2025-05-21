import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            CDSH DAO Governance
          </span>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
