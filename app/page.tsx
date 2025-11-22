import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions </h1>
      <section className='home-section'>
        <CompanionCard
          id="123"
          name="Neural The Brainy Explorer"
          topic="Neural Networks f the Brain"
          subject=" science"
          duration={45}
          color='#ffda6e'
      

        />
        <CompanionCard
          id="133"
          name="Neural The Brainy Explorer"
          topic="Neural Networks f the Brain"
          subject=" science"
          duration={45}
          color='#ffda6e'
      

        />
        <CompanionCard
          id="125"
          name="Neural The Brainy Explorer"
          topic="Neural Networks f the Brain"
          subject=" science"
          duration={45}
          color='#ffda6e'
      

        />
      </section>
      <section className='home-section'>
        <CompanionList/>

      </section>
      </main>
    
  )
}

export default Page