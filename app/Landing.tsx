"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GrInstagram } from "react-icons/gr";


export default function Landing() {
  const text = "Baked goods made by Reem in Victoria"
  const characters = text.split("")

  return (
    <div className='mt-10  flex flex-col items-center font-ms text-choloate'>
        <Image src='/images/logo2.png' alt='cake' width={150} height={150} className='rounded-full contained' />
        <p className='font-ms text-2xl font-bold'>Homemade cake for Vicrtorians</p>
        <a href='https://www.instagram.com/butterflourvictoria/' target='_blank' className='flex flex-row justify-center items-center gap-2'>By 
        <span className='underline '>
          {/* <GrInstagram className='inline'/> */}
           Reem
          </span>
          </a>
    </div>
  )
}
