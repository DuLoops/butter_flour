"use client"
import {useState, useContext, useEffect} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from './button'
import { FaRegClock } from "react-icons/fa";
import { OrderContext } from "@/lib/cartContext"

const availableTimes = {
    weekday: ['Anytime', '2~4 PM', '4~6 PM', '6~8 PM'],
    weekend: ['Anytime', '8~10 AM', '10~12 PM', '12~2 PM', '2~4 PM', '4~6PM']
};

export default function TimePicker() {
    const [time, setTime] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const { state, dispatch } = useContext(OrderContext)

    useEffect(() => {
        dispatch({type:'SET_TIME', payload:time})
    }, [time])
    
    const handleTimeChange = (time: string) => {
        setTime(time)
        setOpen(false)
    }

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 5 || day === 6; // Friday and Saturday
    }

    const getAvailableTimes = () => {
        if (state.pickupDate && (state.pickupDate.getDay() == 5 || state.pickupDate.getDay() == 6)) {
            return availableTimes.weekend;
        }
        return availableTimes.weekday;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"} className={'w-2/3 justify-between font-normal px-2'}>
                        {time ? time : 'Pick a time'}
                    <FaRegClock className="h-4 w-4"/>         
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-center gap-1 w-full'>
                    {getAvailableTimes().map((time, i) => <Button variant={'outline'} key={i} onClick={()=>handleTimeChange(time)}>{time}</Button>)}
                </div>
            </PopoverContent>
        </Popover>
    )
}
