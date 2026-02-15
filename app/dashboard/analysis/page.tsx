import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  getUserSessions,
  getUserCompanion,
  getBookmarkedCompanions,
  getSessionsForAnalysis,
} from '@/lib/actions/companion_action';
import { BookOpen, Clock, Bookmark, TrendingUp, BookMarked } from 'lucide-react';
import { getSubjectColor } from '@/lib/utils';

export default async function DashboardAnalysisPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const [sessions, analysisRows, companions, bookmarked] = await Promise.all([
    getUserSessions(userId, 50),
    getSessionsForAnalysis(userId, 100),
    getUserCompanion(userId),
    getBookmarkedCompanions(userId),
  ]);

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((acc, s) => acc + (s.duration ?? 0), 0);
  const bySubject: Record<string, number> = {};
  analysisRows.forEach(({ subject }) => {
    const sub = (subject ?? 'other').toLowerCase();
    bySubject[sub] = (bySubject[sub] ?? 0) + 1;
  });
  const subjectEntries = Object.entries(bySubject).sort((a, b) => b[1] - a[1]);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeek = analysisRows.filter(
    (r) => r.created_at && new Date(r.created_at) >= weekAgo
  ).length;

  return (
    <main className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Insights from your learning activity.
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <article className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {totalSessions}
            </p>
            <p className="text-sm text-muted-foreground">Total sessions</p>
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-chart-2/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-chart-2" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {thisWeek}
            </p>
            <p className="text-sm text-muted-foreground">This week</p>
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-chart-4/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-chart-4" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {companions.length}
            </p>
            <p className="text-sm text-muted-foreground">Companions</p>
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-chart-3/20 flex items-center justify-center shrink-0">
            <Bookmark className="w-5 h-5 text-chart-3" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {bookmarked.length}
            </p>
            <p className="text-sm text-muted-foreground">Bookmarked</p>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Time spent
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Estimated from session durations.
        </p>
        <p className="text-3xl font-bold text-foreground tabular-nums">
          {totalMinutes}
          <span className="text-lg font-normal text-muted-foreground ml-1">
            min
          </span>
        </p>
      </section>

      {subjectEntries.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Sessions by subject
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Where you&apos;ve been learning the most.
          </p>
          <div className="space-y-3">
            {subjectEntries.map(([subject, count]) => {
              const max = Math.max(...subjectEntries.map(([, c]) => c), 1);
              const width = (count / max) * 100;
              const color = getSubjectColor(subject) ?? 'var(--primary)';
              return (
                <div key={subject} className="flex items-center gap-3">
                  <span
                    className="capitalize text-sm font-medium text-foreground w-24 shrink-0"
                    style={{ color }}
                  >
                    {subject}
                  </span>
                  <div className="flex-1 h-6 rounded-lg bg-muted/60 overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500"
                      style={{
                        width: `${width}%`,
                        backgroundColor: color,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground tabular-nums w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {subjectEntries.length === 0 && (
        <section className="rounded-2xl border border-border bg-card p-10 text-center">
          <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-60" />
          <p className="text-muted-foreground">
            Complete a few sessions to see your analysis here.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Go to <a href="/companions" className="text-primary hover:underline">Courses</a> to start a lesson.
          </p>
        </section>
      )}
    </main>
  );
}
