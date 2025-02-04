"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
  const path=usePathname();
  useEffect(()=>{
    console.log(path)
  },[])
  return (
    <div className='p-4 flex items-center justify-between bg-secondary shadow-md'>
        <Image src={'/logo.svg'} alt="logo" width={160} height={100}/>
        <ul className='hidden md:flex gap-6'>
          <Link href='/dashboard'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard' && 'text-primary font-bold'}
             `}>Dashboard</li>
          </Link>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard/questions' && 'text-primary font-bold'}
             `}>Questions</li>
             <Link href='/dashboard/upgrade'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard/upgrade' && 'text-primary font-bold'}
             `}>Upgrade</li>
            </Link>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard/how' && 'text-primary font-bold'}
             `}>How it works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header