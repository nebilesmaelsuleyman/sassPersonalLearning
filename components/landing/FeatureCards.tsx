import { GraduationCap, Clock, Lock, Award } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Instructors',
    description: 'Learn from AI tutors trained on your chosen subject and topic, with voice and text support.',
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Study at your own pace with sessions you can start and pause anytime, anywhere.',
  },
  {
    icon: Lock,
    title: 'Lifetime Access',
    description: 'Revisit your companions and session history whenever you need to reinforce your learning.',
  },
  {
    icon: Award,
    title: 'Track Progress',
    description: 'See your completed sessions, bookmarks, and learning journey in your dashboard.',
  },
];

export function FeatureCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map(({ icon: Icon, title, description }) => (
        <article
          key={title}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </article>
      ))}
    </section>
  );
}
