import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import { recentSessions } from '@/constants'
import NavBar from '@/components/NavBar'

const Page = () => {
  return (
    <main>
      <NavBar/>
      <h1>Popular Companions </h1>
      <section className="flex gap-4">
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
          color='green'
      

        />
        <CompanionCard
          id="125"
          name="Neural The Brainy Explorer"
          topic="Neural Networks f the Brain"
          subject=" science"
          duration={45}
          color='#blue'
        />

      </section>

      <section className='home-section'>
        <CompanionList 
        title='Recently completed sessions'
        companions={recentSessions}
        className='w-2/3 max-lg:w-full'
        
        />

      </section>
      </main>
    
  )
}

export default Page