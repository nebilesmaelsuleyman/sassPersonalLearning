export const dynamic = 'force-dynamic';

import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureCards } from '@/components/landing/FeatureCards';
import { CategoryGrid } from '@/components/landing/CategoryGrid';
import { PopularCourses } from '@/components/landing/PopularCourses';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { getAllCompanions } from '@/lib/actions/companion_action';

export default async function HomePage() {
  let companions: Awaited<ReturnType<typeof getAllCompanions>> = [];
  try {
    companions = await getAllCompanions({ limit: 4 });
  } catch {
    // Supabase or network error; show rest of landing with empty courses
  }

  return (
    <main className="flex flex-col gap-16 pb-8">
      <HeroSection />
      <section id="features" className="flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why learn with Hayyu</h2>
        <FeatureCards />
      </section>
      <CategoryGrid />
      <PopularCourses companions={companions} />
      <LandingCTA />
    </main>
  );
}
