"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { OrderContext } from '@/lib/context'
export default function OrderMethod() {

  const { state, dispatch } = React.useContext(OrderContext)

  return (
    <div className='flex flex-col gap-1 m-2'>
      <Button
        variant={`${state.order_method == 'Pickup' ? 'default' : 'outline'}`}
        onClick={() => dispatch({ type: "SET_ORDER_METHOD", payload: "Pickup" })}
      >Pick up in James Bay</Button>
      <Button
        variant={`${state.order_method == 'Delivery' ? 'default' : 'outline'}`}
        onClick={() => dispatch({ type: "SET_ORDER_METHOD", payload: "Delivery" })}
      >Delivery within Victoria</Button>
    </div>
  )
}
