'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';


const searchinput = () => {
  const pathname = usePathname();
  const searchParams= useSearchParams();
  const router= useRouter()
  const query= searchParams.get('topic') || ''
  const [searchQuery, setSearchQuery] = useState('')
  
useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    if(searchQuery ){
  const newUrl = formUrlQuery({
  params: searchParams.toString(),
  key: "topic",
  value: searchQuery,
});

router.push(newUrl, {scroll:false});
  }else {
    if(pathname === '/companions'){
      const newUrl= removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove:['topic']
      });
      router.push(newUrl, {scroll:false});
    }
  }
  }, 500);
  

})

return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
      <Image src='/icons/search.svg' alt='search ' width={15} height={15}/>

      <input type="text" placeholder='Search companions ...' className='outline-none' value={searchQuery}  onChange={(e)=> setSearchQuery(e.target.value)}/>
      </div>
  )
}

export default searchinput