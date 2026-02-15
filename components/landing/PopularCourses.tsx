import Link from 'next/link';
import CompanionCard from '@/components/CompanionCard';

interface Companion {
  id: string;
  name: string;
  subject: string;
  topic: string;
  duration: number;
  bookmarked?: boolean;
}

export function PopularCourses({ companions }: { companions: Companion[] }) {
  const display = (companions ?? []).slice(0, 4);

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Popular Courses</h2>
      {display.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {display.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                bookmarked={companion.bookmarked}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/companions"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
            >
              View all courses
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          <p>No courses yet. Create your first companion to get started.</p>
          <Link
            href="/companions/new"
            className="inline-flex mt-4 text-primary font-medium hover:underline"
          >
            Create a companion →
          </Link>
        </div>
      )}
    </section>
  );
}
