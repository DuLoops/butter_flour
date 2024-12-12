"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Cake } from '@/types/Cake'
import OrderDrawer from './OrderDrawer';

interface CakeCardProps {
  cake: Cake;
}

export default function CakeCard({ cake }: CakeCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="border-t-2 border-_white p-2 h-full lg:border-2">
      <h1 className="text-xl mt-1 font-medium">{cake.name}</h1>
      <Image
        src={cake.images[0]}
        alt={cake.name}
        width={460}
        height={300}
        className="h-[240px] object-contain rounded-t-lg m-1"
      />
      <div className="flex flex-col justify-between mt-1 px-4 text-left gap-2">
        <p className="text-sm">{cake.desc}</p>
        <OrderDrawer
          cake={cake}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    </div>
  );
}
