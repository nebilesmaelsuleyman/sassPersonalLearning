import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import Image from 'next/image';
import { getUserSessions, getUserCompanion, getBookmarkedCompanions } from '@/lib/actions/companion_action';
import { BookOpen, Clock, Bookmark, ArrowRight } from 'lucide-react';
import CompanionList from '@/components/CompanionList';

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) return null;

  const [sessions, myCompanions, bookmarked] = await Promise.all([
    getUserSessions(user.id, 5),
    getUserCompanion(user.id),
    getBookmarkedCompanions(user.id),
  ]);

  return (
    <main className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user.firstName}.</p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <article className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{sessions.length}</p>
            <p className="text-sm text-muted-foreground">Lessons completed</p>
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-chart-2/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-chart-2" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{myCompanions.length}</p>
            <p className="text-sm text-muted-foreground">Companions created</p>
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
            <Bookmark className="w-6 h-6 text-chart-4" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{bookmarked.length}</p>
            <p className="text-sm text-muted-foreground">Bookmarked</p>
          </div>
        </article>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Sessions</h2>
          <Link href="/my-journey" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {sessions.length > 0 ? (
          <CompanionList title="" companions={sessions} className="rounded-2xl border border-border bg-card p-4" />
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            No sessions yet. Start a lesson from <Link href="/companions" className="text-primary hover:underline">Courses</Link>.
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/companions"
            className="rounded-xl border border-border bg-card px-5 py-3 font-medium text-foreground hover:bg-accent transition-colors"
          >
            Browse courses
          </Link>
          <Link
            href="/companions/new"
            className="rounded-xl bg-primary text-primary-foreground px-5 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Create a companion
          </Link>
        </div>
      </section>
    </main>
  );
}
