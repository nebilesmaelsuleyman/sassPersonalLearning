'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  History,
  BarChart3,
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Analysis', href: '/dashboard/analysis', icon: BarChart3 },
  { label: 'Sessions', href: '/dashboard/sessions', icon: History },
  { label: 'Transcripts', href: '/dashboard/transcripts', icon: FileText },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-card/50 flex flex-col py-6 px-4">
      <Link href="/" className="font-bold text-xl text-foreground px-2 mb-8">
        Hayyu
      </Link>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 flex items-center gap-2 px-2">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
