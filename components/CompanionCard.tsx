import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
interface CompanionCardProps{
    id:string;
    name:string;
    subject:string;
    duration:number;
    topic:string;
    color:string;
}

const CompanionCard = ({id, name ,subject,duration,topic ,color}:CompanionCardProps) => {
  return (
    <article className='companion-card' style={{backgroundColor:color}}>
        <div className='subject-badge'>{subject}</div>
        <div className='flex justify-between items-center'>
              <button className='companion-bookmark'>  
              <Image src='/icons/bookmark.svg' alt= 'image'></Image>
              </button>
        </div>
        <h2 className='text-2xl font-bold'>{name}</h2>
        <p className='text-sm'>{topic}</p>
        <div className='flex items-center gap-2'>
          <Image src='/icons/clock.svg' alt='duration' width={13.5} height={13.5}></Image>
          <p className='tet-sm'>{duration} minutes</p>
        </div>
        <Link href= {`/companions/${id}`} className='w-full'>
        <button className='btn-primary w-full  justify-center'>Lounch Lesson</button>
        </Link>
       
    </article>
  )
}

export default CompanionCard