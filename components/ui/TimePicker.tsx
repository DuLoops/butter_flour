"use client"
import {useState, useContext, useEffect} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from './button'
import { FaRegClock } from "react-icons/fa";

import { OrderContext } from "@/lib/cartContext"

const availableTimes ={
    weekday: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'],
    weekend: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']
}
export default function TimePicker() {
    const [time, setTime] = useState('2:00 AM')
    const [open, setOpen] = useState(false)
    const { state, dispatch } = useContext(OrderContext)

    useEffect(() => {
        dispatch({type:'SET_TIME', payload:time})
    }, [time])
    
    const handleTimeChange = (time: string) => {
        setTime(time)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"} className='w-2/3 justify-between font-normal px-2'>
                        {time}
                    <FaRegClock className="h-4 w-4"/>         
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='grid grid-cols-2 text-center gap-1'>
                    {availableTimes.weekday.map((time, i) => <Button variant={'outline'} key={i} onClick={()=>handleTimeChange(time)}>{time}</Button>)}
                </div>
            </PopoverContent>
        </Popover>
    )
}
