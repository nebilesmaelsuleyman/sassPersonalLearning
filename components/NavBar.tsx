
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
   <nav className='navbar'>
    <Link href='/'>
    <div className='flex items-center gab-2.5 cursor-pointer'>
    <Image src='/images/logo.svg' alt='log0' width={35} height={35}></Image>
    </div>
    </Link>
    <div className='flex items-cener gap-8'>
        <p>Home</p>
        <p>Companion</p>
        <p>Home</p>
        
    </div>
   </nav>
  )
}

export default NavBar