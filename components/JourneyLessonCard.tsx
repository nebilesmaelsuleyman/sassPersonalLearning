'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getSubjectColor } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface JourneyLessonCardProps {
  id: string;
  name: string;
  subject: string;
  topic: string;
  duration?: number;
}

export function JourneyLessonCard({
  id,
  name,
  subject,
  topic,
  duration = 0,
}: JourneyLessonCardProps) {
  const color = getSubjectColor(subject);

  return (
    <Link
      href={`/companions/${id}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/30"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: color ?? 'var(--primary)' }}
      >
        <Image
          src={`/icons/${subject}.svg`}
          alt=""
          width={24}
          height={24}
          className="opacity-90"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground truncate">{name}</p>
        <p className="text-sm text-muted-foreground truncate">{topic}</p>
      </div>
      {duration > 0 && (
        <span className="text-xs text-muted-foreground shrink-0">
          {duration} min
        </span>
      )}
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
}
