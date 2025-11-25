import React from 'react'
import CompanionForm from '@/components/CompanionForm'
const newcomp = () => {
  return (
    <main className='min-lg:w1/3 min-mid:2/3 items-center justify-center'>
        <article className='w-full gap-4 flex flex-col '>
            <h1> companion Builder</h1>
            <CompanionForm/>
        </article>
    </main>
  )
}

export default newcomp