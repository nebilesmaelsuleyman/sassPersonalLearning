
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SignInButton , SignUpButton , SignedIn , SignedOut , UserButton } from '@clerk/nextjs'
import Navitems  from './Navitems'
const NavBar = () => {
  return (
   <nav className='navbar'>
    <Link href='/'>
    <div className='flex items-center gab-2.5 cursor-pointer'>
    <Image src='/images/logo.svg' alt='log0' width={35} height={35}></Image>
    </div>
    </Link>
    <div className='flex items-cener gap-8'>
        <Navitems/>
        <SignedOut>
            <SignInButton>
               <button className='btn-secondary'>Sign In</button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        
    </div>
   </nav>
  )
}

export default NavBar