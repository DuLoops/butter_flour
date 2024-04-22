"use client"
import React from 'react'
import { OrderContext } from '@/lib/context'
import { DatePicker } from '../ui/DatePicker'
import {Input} from '../ui/input'
import TimePicker from 'react-time-picker'
export default function OrderTime() {
    const { state, dispatch } = React.useContext(OrderContext)
    const [time, setTime] = React.useState('02:00');

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
                    <Input type='time'  value={time} onChange={(e)=>setTime(e.target.value)}/>
                    {/* <TimePicker /> */}
                </div>
            </div>
        </div>
    )
}
