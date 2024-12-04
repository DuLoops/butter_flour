import React from 'react'
import OrderMethod from '@/components/order/OrderMethod'
import OrderTime from '@/components/order/OrderTime'
import Menu from '@/components/menu/Menu'
export default function Order() {
    return (
        <div className='text-center my-5 flex flex-col gap-2'>
            <Menu />
            <div className='flex flex-col gap-5 mt-5'>
                <h1 className='text-lg'>Order Details</h1>
                <OrderMethod />
                <OrderTime />
            </div>
        </div>

    )
}
