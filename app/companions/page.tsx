import React from 'react'
import Link from 'next/link'
import { getAllCompanions } from '@/lib/actions/companion_action'
import CompanionCard from '@/components/CompanionCard'
import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/Subjectfilter'


const companienLibrary = async ({searchParams}:SearchParams)=>{
    const filter = await searchParams ;
    const subject = filter.subject? filter.subject : '';
    const topic = filter .topic? filter.topic : ""

    let companions: Awaited<ReturnType<typeof getAllCompanions>> = []
    try {
        companions = await getAllCompanions({ subject, topic })
    } catch {
        // show empty state
    }

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {companions.length > 0 ? (
                    companions.map((companion) => (
                        <CompanionCard key={companion.id} {...companion} />
                    ))
                ) : (
                    <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground col-span-full">
                        <p>No companions match your filters.</p>
                        <p className="text-sm mt-2">Try a different subject or topic, or create a new companion.</p>
                        <Link href="/companions/new" className="inline-flex mt-4 text-primary font-medium hover:underline">
                            Create a companion →
                        </Link>
                    </div>
                )}
            </section>
        </main>
    )
}
export default companienLibrary
