import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { menuItems } from '@/lib/data';
import Link from 'next/link';
import {motion} from 'framer-motion';
import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";


interface SideNavProps {
    setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav({ setSideMenuOpen }: SideNavProps) {
    return (
        <motion.div 
            initial={{width: 0}}
            animate={{width: '90vw'}}
            exit={{
                width: 0,
              }}
            className="top-0 left-0 fixed h-screen bg-_pink shadow-lg p-3 flex flex-col justify-between"
        >
            <button className="self-end top-0 right-0 p-2" onClick={() => {setSideMenuOpen(false)}}>
                <AiOutlineClose className='text-2xl' />
            </button>
            <ol className='flex flex-col gap-10 text-2xl  pl-6'>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link} className=''>{item.name}</Link>
                    </li>
                ))}
            </ol>
            <div className='self-center flex flex-col gap-1' >
                <a href='mailto:butterflourcake@gmail.com' className='flex items-center'>
                    <AiOutlineMail className='size-7' />
                    <span className='ml-1 underline underline-offset-2 decoration-_blue'>butterflourcake@gmail.com</span>
                    </a>
                
                <a href="https://www.instagram.com/butterflourvictoria/" target="_blank" rel="noreferrer" className='flex items-center'>
                    <AiOutlineInstagram className='size-7' />
                    <p className='underline ml-1 decoration-_blue underline-offset-2'>@butterflourvictoria</p>
                </a>
            </div>
        </motion.div>
    )
}
