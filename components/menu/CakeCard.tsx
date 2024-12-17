import Image from 'next/image'
import React from 'react'
import { Cake } from '@/types/Cake'
import MenuDialog from './MenuDialog';
import { Suspense } from 'react';
interface CakeCardProps {
  cake: Cake;
}

export default function CakeCard({ cake }: CakeCardProps) {
 
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
        <Suspense fallback={<div>Loading...</div>}>
          <MenuDialog
            cake={cake}
          />
        </Suspense>
      </div>
    </div>
  );
}
