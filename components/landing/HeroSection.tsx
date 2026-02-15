'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/companions?topic=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/companions');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-border p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[420px]">
      <div className="flex-1 max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
          Learn New Skills Anytime, Anywhere
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl">
          Explore a variety of courses and boost your knowledge with AI-powered voice companions and interactive chat.
        </p>
        <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="relative flex-1 flex items-center rounded-xl border border-border bg-card">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none rounded-xl"
            />
          </div>
          <Link href="/companions" className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold px-8 py-3.5 hover:opacity-90 transition-opacity whitespace-nowrap">
            Get Started
          </Link>
        </form>
      </div>
      <div className="hidden lg:flex flex-1 justify-end items-center relative">
        <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-3xl bg-primary/20 border border-border flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-grid-pattern opacity-5" />
          <div className="text-6xl">🎓</div>
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-xl bg-chart-4/80 flex items-center justify-center text-xl">💡</div>
          <div className="absolute bottom-4 -left-2 w-10 h-10 rounded-lg bg-chart-2/80 flex items-center justify-center text-sm">✓</div>
        </div>
      </div>
    </section>
  );
}
