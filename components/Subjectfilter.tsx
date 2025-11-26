'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {subjects} from '@/constants'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useState } from 'react';
import { useEffect } from 'react';


const subjectfilter = () => {

const searchParams= useSearchParams();
const router=useRouter()
const query= searchParams.get('subject') || ''
const [selectsubject, setSelectsubject]=useState(query)

useEffect(() => {
  const timeout = setTimeout(() => {
    let newUrl = ''

    if (selectsubject === 'All' || selectsubject === '') {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      })
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: selectsubject,
      })
    }

    if (newUrl && newUrl !== window.location.href) {
      router.push(newUrl, { scroll: false })
    }
  }, 300)

  return () => clearTimeout(timeout)
}, [selectsubject, searchParams, router])
  


  return (
  <Select value={selectsubject} onValueChange={setSelectsubject}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent className={undefined} >
          {subjects.map((subject)=>(
            <SelectItem value={subject} className={undefined} key={subject}>{subject}</SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}

export default subjectfilter