import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  getUserCompanion,
  getUserSessions,
  getBookmarkedCompanions,
} from '@/lib/actions/companion_action';
import Image from 'next/image';
import { JourneyLessonCard } from '@/components/JourneyLessonCard';
import { Bookmark, Clock, BookOpen, GraduationCap } from 'lucide-react';

type LessonRow = { id: string; name: string; subject: string; topic: string; duration?: number };

export default async function MyJourneyPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const [companions, sessionHistory, bookmarkedCompanions] = await Promise.all([
    getUserCompanion(user.id),
    getUserSessions(user.id, 20),
    getBookmarkedCompanions(user.id),
  ]);

  const sessions = (sessionHistory ?? []) as unknown as LessonRow[];
  const bookmarked = (bookmarkedCompanions ?? []) as unknown as LessonRow[];
  const myCompanions = (companions ?? []) as unknown as LessonRow[];

  const email = user.emailAddresses?.[0]?.emailAddress ?? '';

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Profile card */}
      <section className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={user.imageUrl}
                alt={user.firstName ?? 'User'}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">
                  {sessions.length}
                </p>
                <p className="text-xs text-muted-foreground">Lessons completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
                <BookOpen className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">
                  {myCompanions.length}
                </p>
                <p className="text-xs text-muted-foreground">Companions created</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Bookmarked */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Bookmarked ({bookmarked.length})
          </h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          {bookmarked.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
              {bookmarked.map((c) => (
                <li key={c.id}>
                  <JourneyLessonCard
                    id={c.id}
                    name={c.name}
                    subject={c.subject}
                    topic={c.topic}
                    duration={c.duration}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No bookmarks yet. Save lessons from the Courses page to see them here.
            </p>
          )}
        </div>
      </section>

      {/* Section: Recent sessions */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-chart-2" />
          <h2 className="text-lg font-semibold text-foreground">
            Recent sessions
          </h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          {sessions.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
              {sessions.map((c) => (
                <li key={c.id}>
                  <JourneyLessonCard
                    id={c.id}
                    name={c.name}
                    subject={c.subject}
                    topic={c.topic}
                    duration={c.duration}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No sessions yet. Start a lesson from Courses to see recent activity here.
            </p>
          )}
        </div>
      </section>

      {/* Section: My companions */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-chart-4" />
          <h2 className="text-lg font-semibold text-foreground">
            My companions ({myCompanions.length})
          </h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          {myCompanions.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
              {myCompanions.map((c) => (
                <li key={c.id}>
                  <JourneyLessonCard
                    id={c.id}
                    name={c.name}
                    subject={c.subject}
                    topic={c.topic}
                    duration={c.duration}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              You haven’t created any companions yet. Create one from the Courses page.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
