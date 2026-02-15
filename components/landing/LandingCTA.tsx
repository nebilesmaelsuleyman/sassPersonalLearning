import Link from 'next/link';

export function LandingCTA() {
  return (
    <section className="rounded-3xl border border-border bg-primary/10 py-14 px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Start Learning?</h2>
      <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
        Join now and boost your skills with AI-powered voice companions and chat.
      </p>
      <Link
        href="/companions"
        className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold px-8 py-4 mt-8 hover:opacity-90 transition-opacity text-lg"
      >
        Get Started
      </Link>
    </section>
  );
}
