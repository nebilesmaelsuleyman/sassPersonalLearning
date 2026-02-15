import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getSessionsWithTranscripts } from '@/lib/actions/companion_action';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default async function DashboardTranscriptsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  let sessions: Awaited<ReturnType<typeof getSessionsWithTranscripts>> = [];
  try {
    sessions = await getSessionsWithTranscripts(userId);
  } catch {
    // transcript column may not exist yet
  }

  return (
    <main className="p-6 md:p-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Transcripts</h1>
      <p className="text-muted-foreground mb-8">Interaction history from your voice sessions.</p>
      {sessions.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-2">
          {sessions.map((s) => {
            const companion = Array.isArray(s.companions) ? s.companions[0] : s.companions;
            const name = companion?.name ?? 'Companion';
            const topic = companion?.topic ?? '';
            const date = s.created_at
              ? new Date(s.created_at).toLocaleDateString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : '';
            const transcript = (s.transcript ?? []) as { role: string; content: string }[];
            return (
              <AccordionItem
                key={s.id}
                value={s.id}
                className="rounded-2xl border border-border bg-card px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="text-left">
                    <span className="font-semibold text-foreground">{name}</span>
                    <span className="text-muted-foreground ml-2">— {topic}</span>
                    <span className="text-muted-foreground text-sm block mt-0.5">{date}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="rounded-xl bg-muted/50 p-4 space-y-3 max-h-80 overflow-y-auto">
                    {transcript.map((msg, i) => (
                      <div
                        key={i}
                        className={
                          msg.role === 'assistant'
                            ? 'text-foreground'
                            : 'text-primary font-medium'
                        }
                      >
                        <span className="text-xs opacity-70">
                          {msg.role === 'assistant' ? name.split(' ')[0] : 'You'}:
                        </span>
                        <p className="text-sm mt-0.5 whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/companions/${(companion as { id?: string })?.id}`}
                    className="inline-block mt-3 text-sm text-primary hover:underline"
                  >
                    Open lesson →
                  </Link>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          <p>No saved transcripts yet.</p>
          <p className="text-sm mt-2">
            Complete a voice session and end the call to save the transcript. Make sure the{' '}
            <code className="bg-muted px-1 rounded">transcript</code> column exists on{' '}
            <code className="bg-muted px-1 rounded">session_history</code> in Supabase.
          </p>
        </div>
      )}
    </main>
  );
}
