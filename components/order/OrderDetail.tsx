import React from 'react'
import OrderMethod from './OrderMethod'
import OrderTime from './OrderTime'
export default function OrderDetail() {
  return (
    <div className='text-center'>
      <OrderMethod />
      <OrderTime />
    </div>
  )
}
