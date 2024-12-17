"use client"

import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiCart } from "react-icons/bi";
import { AnimatePresence, motion } from 'framer-motion'
import { menuItems } from '@/lib/data'
import SideNav from './SideNav'
import { FaGift, FaHome } from "react-icons/fa";
import { OrderContext } from '@/lib/cartContext';
import { usePathname } from 'next/navigation';
import { PiCakeFill } from "react-icons/pi";

export default function Nav() {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const { state } = useContext(OrderContext);
  const isCart = usePathname() == '/cart';
  const [animateGift, setAnimateGift] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);

  const giftAnimationVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.5, 1] }
  };

  useEffect(() => {
    if (state.orders.length > 0 && !animateGift) {
      setCartEmpty(false);
      setAnimateGift(true);
      const timer = setTimeout(() => setAnimateGift(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setCartEmpty(true);
    }
    
  }, [state.orders]);
  return (

      <nav className='grid grid-cols-3 w-screen p-2 bg-_blue items-center sticky top-0 z-50'>
        <button className='col-start-1 flex justify-start items-center lg:hidden' onClick={() => setSideMenuOpen(true)}>
          <AiOutlineMenu className='size-7' />
        </button>
        <AnimatePresence>
          {isSideMenuOpen && (
            <SideNav setSideMenuOpen={setSideMenuOpen} />
          )}
        </AnimatePresence>
        <div className='col-start-1 hidden lg:block'>
          <ol className='flex flex-row gap-3 justify-end pr-3'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className='text-xl hover:underline '>{item.name}</Link>
              </li>
            ))}
          </ol>
        </div>
        <Link href={'/'} className='col-start-2 flex justify-center'>
          <Image src='/svg/bfLogo.svg' alt='ButterFlour' width={100} height={40}/>
        </Link>
        <Link href={isCart ? '/' : '/cart'} scroll={false} className={`justify-self-end flex justify-center items-center size-10 rounded-full`}> 
          {isCart ? (
            <FaHome className='size-7'/>
          ) : (
            <motion.div
              initial="initial"
              animate={animateGift ? "animate" : "initial"}
              variants={giftAnimationVariants}
              transition={{ duration: 1.5 }}
              className={`size-10 rounded-full flex justify-center items-center ${!isCart && !cartEmpty ? 'bg-_pink shadow-md' : ''}`}
            >
              <FaGift className='size-7'/>
            </motion.div>
          )}
        </Link>
      </nav>

  )
}
