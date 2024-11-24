import React from 'react'
import OrderMethod from '@/components/order/OrderMethod'
import OrderTime from '@/components/order/OrderTime'
import Menu from '@/components/menu/Menu'
export default function Order() {
    return (
        <div className='text-center my-5 flex flex-col gap-2'>
            <h1 className='text-xl'>ORDERS</h1>
            <OrderMethod />
            <OrderTime />
            <Menu />
        </div>

    )
}
