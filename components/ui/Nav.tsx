"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiCart } from "react-icons/bi";
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { menuItems } from '@/lib/data'
import SideNav from './SideNav'

export default function Nav({ children }: { children: React.ReactNode }) {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false)
  return (
    <div>
      <nav className='grid grid-cols-3 w-screen p-2 bg-_blue items-center'>
        <Link href={'/cart'}>
          <BiCart className='size-7' />
        </Link>
        <Link href={'/'} className='col-start-2 flex justify-center'>
          {/* <Image src='/images/logo.png' alt='ButterFlour' width={100} height={40}/> */}
          {/* Logo */}
          <h1 className='text-2xl font-bold'>ButterFlour</h1>
      </Link>
        <button className='col-start-3 row-start-1 flex justify-end items-center lg:hidden' onClick={() => setSideMenuOpen(true)}>
          <AiOutlineMenu className='size-7' />
        </button>
        <AnimatePresence>
          {isSideMenuOpen && (
            <SideNav setSideMenuOpen={setSideMenuOpen} />
          )}
        </AnimatePresence>
        <div className='col-start-3 row-start-1 hidden lg:block'>
          <ol className='flex flex-row gap-3 justify-end pr-3'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className='text-xl hover:underline '>{item.name}</Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>
      {children}
    </div>
  )
}
