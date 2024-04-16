import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { menuItems } from '@/lib/data';
import Link from 'next/link';
import {motion} from 'framer-motion';
import { AiOutlineInstagram } from "react-icons/ai";


interface SideNavProps {
    setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav({ setSideMenuOpen }: SideNavProps) {
    return (
        <motion.aside 
            initial={{width: 0}}
            animate={{width: '80vw'}}
            exit={{
                width: 0,
                transition: { delay: 0, duration: 0.3 }
              }}
            className="top-0 right-0 fixed h-full bg-_pink shadow-lg p-3"
        >
            <button className="absolute top-0 right-0 p-2" onClick={() => {setSideMenuOpen(false)}}>
                <AiOutlineClose className='text-4xl' />
            </button>
            <ol className='flex flex-col gap-20 my-32 text-4xl  pl-6'>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link} className=''>{item.name}</Link>
                    </li>
                ))}
            </ol>

            <a href="https://www.instagram.com/butterflourvictoria/" target="_blank" rel="noreferrer" className='flex flex-row gap-5 items-center'>
                <AiOutlineInstagram className='size-10' />
                <p className='text-2xl'>@butterflourvictoria</p>
            </a>
        </motion.aside>
    )
}
