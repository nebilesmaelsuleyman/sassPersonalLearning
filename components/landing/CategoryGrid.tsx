'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getSubjectColor } from '@/lib/utils';
import { subjects } from '@/constants';

const categorySubjects = subjects.filter((s) => s !== 'All');

export function CategoryGrid() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Top Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categorySubjects.map((subject) => {
          const color = getSubjectColor(subject);
          return (
            <Link
              key={subject}
              href={`/companions?subject=${encodeURIComponent(subject)}`}
              className="rounded-2xl border border-border overflow-hidden bg-card p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all min-h-[140px]"
              style={{ backgroundColor: `${color}40` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
                <Image src={`/icons/${subject}.svg`} alt={subject} width={28} height={28} />
              </div>
              <span className="font-medium text-foreground capitalize">{subject}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
