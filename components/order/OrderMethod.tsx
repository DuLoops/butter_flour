"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { OrderContext } from '@/lib/cartContext'


export default function OrderMethod() {

  const { state, dispatch } = React.useContext(OrderContext)
  return (
    <div className='flex flex-col'>
      <h1>Select pickup method</h1>
      <div className='flex flex-row justify-center gap-3 m-2'>
        <Button
          className='h-[60px] w-full'
          variant={`${state.order_method == 'Pickup' ? 'default' : 'outline'}`}
          onClick={() => dispatch({ type: "SET_ORDER_METHOD", payload: "Pickup" })}
        >Pick up<br />in downtown</Button>
        <Button
          className='h-[60px] w-full'
          variant={`${state.order_method == 'Delivery' ? 'default' : 'outline'}`}
          onClick={() => dispatch({ type: "SET_ORDER_METHOD", payload: "Delivery" })}
        >
           Delivery<br /> within Victoria

        </Button>
      </div>
    </div>
  )
}
