"use client"
import React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'

const navItems=[
   {label:"HOMe ",href:"/"},
   {label:"MY JOURNEY ",href:"/my-journey"},
   {label:"COMPANIONS ",href:"/companions"},
]

 const Navitems = () => {
    const pathname = usePathname();
  return (
    <nav className= 'flex items-center gap-4'>
     {navItems.map(({label,href})=>(
        <Link href={href}key={label} className={cn(pathname === href && 'text-primary ')}>
         {label}
        </Link>
     ))}

           </nav>
  )
}
export default Navitems
