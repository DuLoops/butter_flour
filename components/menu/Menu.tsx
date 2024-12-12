import React from 'react'
import CakeCard from './CakeCard'
import {cakeData} from '@/data/cakeData'

export default function Menu() {
  return (
    <div className='text-center mt-10 bg-white p-2'>
        <h1 className='text-lg font-ms'>Cake Menu</h1>
        <div className='flex flex-col gap-4 m-2 lg:grid lg:grid-cols-3'>
            {cakeData.map((cake, index) => (
                    <CakeCard cake={cake} key={index}/>
            ))}
        </div>
    </div>
  )
}
