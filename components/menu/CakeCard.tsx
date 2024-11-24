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
    <div className="gap-2 rounded-lg bg-white m-1 shadow">
      <h1 className="text-xl mt-1 font-bold">{cake.name}</h1>
      <Image
        src={cake.image}
        alt={cake.name}
        width={460}
        height={300}
        className="h-[240px] object-contain rounded-t-lg m-1"
      />
      <div className="flex flex-col h-full justify-between">
        <p className="text-sm mx-4">{cake.desc}</p>
        <OrderDrawer
          cake={cake}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    </div>
  );
}
