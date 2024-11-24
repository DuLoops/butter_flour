"use client"
import React from 'react'
import { OrderContext } from '@/lib/cartContext'
import { DatePicker } from '../ui/DatePicker'
import {Input} from '../ui/input'
import TimePicker from '@/components/ui/TimePicker'
export default function OrderTime() {
    const { state, dispatch } = React.useContext(OrderContext)
    const [time, setTime] = React.useState('14:00');
    return (
        <div>
            <h1>Select {state.order_method == 'Delivery' ? 'delivery' : 'pickup'} time</h1>
            <div className='flex flex-col  p-3 gap-3'>
                <div className='flex flex-row items-center justify-between'>
                    <p>Date</p>
                    <DatePicker />
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <p>Time</p>
                    {/* <Input type='time'  value={time} onChange={(e)=>setTime(e.target.value)} min='14:00' max='19:00'/> */}
                    <TimePicker />
                </div>
            </div>
        </div>
    )
}
