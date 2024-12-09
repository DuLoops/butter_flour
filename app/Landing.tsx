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
        <LandingImage />
        <p className='font-ms text-2xl font-bold mt-2'>Homemade cake for Vicrtorians</p>
        <a href='https://www.instagram.com/butterflourvictoria/' target='_blank' className='flex flex-row justify-center items-center gap-2'>By 
        <span className='underline '>
          {/* <GrInstagram className='inline'/> */}
           Reem
          </span>
          </a>
    </div>
  )
}
function LandingImage() {
  return(
  <div className='relative'>
    <Image src='/images/dev/landingImg.png' alt='cake' width={150} height={150} className='h-auto w-auto' />
    <Image src='/images/dev/bf1.png' alt='butterfly1' width={40} height={40} className='absolute -right-14 top-10 size-auto' />
    <Image src='/images/dev/bf2.png' alt='butterfly2' width={35} height={35} className='absolute -left-12 bottom-12 size-auto' />
  </div>
)}
