'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
  { label: 'Pricing', href: '/subscription' },
  { label: 'Dashboard', href: '/dashboard' },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="navbar border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <Image src="/images/logo.svg" alt="Hayyu" width={35} height={35} />
        <span className="font-bold text-xl text-foreground hidden sm:inline">Hayyu</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={cn(pathname === href && 'text-primary font-medium')}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-secondary">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary">Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;