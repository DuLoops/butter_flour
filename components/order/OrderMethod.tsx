"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { OrderContext } from '@/lib/cartContext'


export default function OrderMethod() {

  const { state, dispatch } = React.useContext(OrderContext)
  return (
    <div className='flex flex-col md:w-1/2 '>
      <h1>Select pickup method</h1>
      <div className='flex flex-row justify-center gap-3 p-2 md:flex-col'>
        <Button
          className='h-[60px] w-1/2 md:w-full'
          variant={`${state.order_method == 'Pickup' ? 'dark' : 'outline'}`}
          onClick={() => dispatch({ type: "SET_ORDER_METHOD", payload: "Pickup" })}
        >Pick up<br />at Beacon Hill Park</Button>
        <Button
          className='h-[60px] w-1/2 md:w-full'
          variant={`${state.order_method == 'Delivery' ? 'dark' : 'outline'}`}
          onClick={() => dispatch({ type: "SET_ORDER_METHOD", payload: "Delivery" })}
        >
           Delivery<br /> within Victoria
        </Button>
      </div>
    </div>
  )
}
