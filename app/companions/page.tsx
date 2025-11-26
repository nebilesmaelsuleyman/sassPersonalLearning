import React from 'react'
import {getAllCompanions} from '@/lib/actions/companion_action'
import CompanionCard from '@/components/CompanionCard'
import  {getSubjectColor} from '@/lib/utils'
import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/Subjectfilter'
const companienLibrary = async ({searchParams}:SearchParams)=>{
    const filter = await searchParams ;
    const subject = filter.subject? filter.subject : '';
    const topic = filter .topic? filter.topic : ""

    const companions= await getAllCompanions({subject, topic})
    console.log(companions)
    
    
    return <>
   <main>
    <section className='flex justify-between gap-4 max-sm:flex-col'>
        <h1>Companion Library</h1>
        <div className = 'flex gap-4'>
            <SearchInput/>
            <SubjectFilter/>
            </div>
    </section>
    <section className ='companions-grid'>
        {companions.map((companion)=>(
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
        )

        )}

    </section>
   </main>
    </>
}
export default companienLibrary
