'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { addToBookmark, removeBookmark } from '@/lib/actions/companion_action';
import { toast } from 'sonner';
import { cn, getSubjectColor } from '@/lib/utils';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';

interface CompanionCardProps {
  id: string;
  name: string;
  subject: string;
  duration: number;
  topic: string;
  color?: string;
  bookmarked?: boolean;
}

export default function CompanionCard({
  id,
  name,
  subject,
  duration,
  topic,
  bookmarked,
}: CompanionCardProps) {
  const pathname = usePathname();
  const subjectColor = getSubjectColor(subject);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (bookmarked) {
        await removeBookmark();
        toast.error('Removed from bookmarks');
      } else {
        await addToBookmark(id, pathname ?? '/');
        toast.success('Added to bookmarks');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <Link href={`/companions/${id}`} className="group block h-full">
      <article
        className={cn(
          'h-full flex flex-col rounded-2xl border border-border bg-card overflow-hidden',
          'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
          'hover:-translate-y-0.5 transition-all duration-200'
        )}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full shrink-0"
          style={{ backgroundColor: subjectColor ?? 'var(--primary)' }}
        />
        <div className="flex flex-1 flex-col p-5 gap-4">
          <div className="flex items-start justify-between gap-2">
            <span
              className={cn(
                'subject-badge text-[11px] font-semibold uppercase tracking-wider',
                'text-white/95'
              )}
              style={{ backgroundColor: subjectColor ?? 'var(--primary)' }}
            >
              {subject}
            </span>
            <button
              type="button"
              onClick={handleBookmark}
              className={cn(
                'p-2 rounded-xl text-muted-foreground hover:text-foreground',
                'hover:bg-muted/80 transition-colors'
              )}
              aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              <Bookmark
                className={cn('w-4 h-4', bookmarked && 'fill-primary text-primary')}
              />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <h2 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {topic}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {duration} min
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              Launch lesson
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
