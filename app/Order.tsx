import React from 'react'
import OrderMethod from '@/components/order/OrderMethod'
import OrderTime from '@/components/order/OrderTime'
import Menu from '@/components/menu/Menu'
export default function Order() {
    return (
        <div className='text-center my-5 flex flex-col gap-2'>
            <Menu />
            <h1 className='text-lg mt-4 mb-2 lg:mt-20'>Order Details</h1>
            <div className='flex flex-col gap-5 md:flex-row w-screen justify-around '>
                <OrderMethod />
                <OrderTime />
            </div>
        </div>

    )
}
