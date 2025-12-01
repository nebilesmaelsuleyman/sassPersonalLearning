import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
 interface companionsListprops{
  title?:string,
  companions?:Companion[];
  className?:string
 }
 
 import Link from 'next/link'
 import Image from 'next/image'
const CompanionList = ({title, companions, className}:companionsListprops) => {
  

  return (
   <article className={cn('companion-list', className)}>
    <h2>Recent Sessions</h2>
    <Table className={undefined}>

  <TableHeader className={undefined}>
    <TableRow className={undefined}>
      <TableHead className="text-lg w-2/3">Lessons</TableHead>
      <TableHead className='text-lg'>Subject</TableHead>
      <TableHead className='text-lg text-right'>Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody className={undefined}>
    {companions?.map((companion)=>(
      <TableRow className={undefined} key={companion.id}>
      <TableCell className={undefined} >
        <Link href={`/companions/${companion.id}`}>
        <div className='flex items-center gap-3 '>
          <div>
              <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35}></Image>
          </div>
        <div className='flex flex-col gap-2'>
        <p className='font-bold text-lg'>{companion.name}</p>
        <p className=' text-lg'>Topic:{companion.topic}</p>

          </div>
        </div>
        
        </Link>
      </TableCell>
      <TableCell className={undefined}>
        <div className='subject-badge w-fit hidden md:flex items-center gap-2 px-3 py-1 rounded-lg' style={{backgroundColor:getSubjectColor(companion.subject)}}>
          <p className='text-white '>{companion.subject}</p>
        </div>
        <div className='flex items-center justify-center rounded-lg w-fit p-2 md:hidden ' style={{backgroundColor:getSubjectColor(companion.subject)}}>
            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={18} height={18}></Image>

        </div>

      </TableCell>
      <TableCell className={undefined}>
        <div className='flex items-center justify-center '>
        <p className='text-2xl'>{companion.duration}</p>
        <span className='max-md:hidden'>min</span>
        </div>
      </TableCell>
      </TableRow>
      
    ))}

    
    
    
  </TableBody>
</Table>
   </article>
  )
}

export default CompanionList