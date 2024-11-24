import React from 'react'
import CakeCard from './CakeCard'
import {cakeData} from '@/data/cakeData'

export default function Menu() {
  return (
    <div className='text-center'>
        <h1 className='text-lg'>CAKES</h1>
        <div className='flex flex-col gap-2 p-2 mb-[1000px]'>
            {cakeData.map((cake) => (
                <CakeCard key={cake.id} cake={cake} />
            ))}
        </div>
    </div>
  )
}
