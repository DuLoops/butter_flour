"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiCart } from "react-icons/bi";
import { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { menuItems } from '@/lib/data'
import SideNav from './SideNav'
import { FaGift, FaHome } from "react-icons/fa";
import { OrderContext } from '@/lib/cartContext';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const { state } = useContext(OrderContext);
  const isCart = usePathname() == '/cart';

  const cartEmpty = state.orders.length === 0;

  return (

      <nav className='grid grid-cols-3 w-screen p-2 bg-_blue items-center sticky top-0 z-50'>
        <Link href={isCart ? '/' : '/cart'} scroll={false} className={`flex justify-center items-center size-10 rounded-full ${!isCart && !cartEmpty ? 'bg-_pink shadow' : ''}`}>
          {isCart ? <FaHome className='size-7'/> : <FaGift className='size-7'/>}
        </Link>
        <Link href={'/'} className='col-start-2 flex justify-center'>
          <Image src='/svg/bfLogo.svg' alt='ButterFlour' width={100} height={40}/>
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

  )
}
