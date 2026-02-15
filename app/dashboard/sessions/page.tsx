import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUserSessions } from '@/lib/actions/companion_action';
import CompanionList from '@/components/CompanionList';

export default async function DashboardSessionsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const sessions = await getUserSessions(userId, 20);

  return (
    <main className="p-6 md:p-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Sessions</h1>
      <p className="text-muted-foreground mb-8">Your recent voice and chat sessions.</p>
      {sessions.length > 0 ? (
        <CompanionList title="" companions={sessions} className="rounded-2xl border border-border bg-card p-4" />
      ) : (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          No sessions yet. Start a lesson from <Link href="/companions" className="text-primary hover:underline">Courses</Link>.
        </div>
      )}
    </main>
  );
}
