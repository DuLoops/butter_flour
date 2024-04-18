"use client"
import React from 'react'
import { OrderContext } from '@/lib/context'
import { DatePicker } from '../ui/DatePicker'
export default function OrderTime() {
    const { state, dispatch } = React.useContext(OrderContext)
    return (
        <div>
            <h1>Select {state.order_method == 'Delivery' ? 'delivery' : 'pickup'} time</h1>
            <div className='flex flex-col gap-1 m-2'>
                <div>
                    <p>Date</p>
                    <DatePicker />
                </div>
                <div>
                    <p>Time</p>
                </div>
            </div>
        </div>
    )
}
