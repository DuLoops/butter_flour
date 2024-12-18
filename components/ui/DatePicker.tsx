"use client"

import { useContext, useState } from "react"
import { format, addDays, addMonths, isBefore, isAfter } from "date-fns"
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { OrderContext } from "@/lib/cartContext"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
  const { state, dispatch } = useContext(OrderContext)
  const [open, setOpen] = useState(false)
  const today = new Date();
  const minDate = today.getHours() >= 18 ? addDays(today, 3) : addDays(today, 2);
  const maxDate = addMonths(today, 2);

  const setDate = (day: Date | undefined) => {
    if (day && (isBefore(day, minDate) || isAfter(day, maxDate))) {
      return;
    }
    dispatch({ type: 'SET_DATE', payload: day })
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={
            "w-2/3 justify-between font-normal px-2"}
        >
          {state.pickupDate ? format(state.pickupDate, "PPP") : <span>Pick a date</span>}
          <FaRegCalendarAlt className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1" >
        <Calendar
          mode="single"
          selected={state.pickupDate || undefined}
          onSelect={setDate}
          initialFocus
          disabled={(date) => isBefore(date, minDate) || isAfter(date, maxDate)}
        />
        <div className="text-xs text-muted-foreground p-2 ">
          {today.getHours() < 18 
            ? 'Place your order by 6 PM to have it ready within 2 days.' 
            : 'Orders require a minimum of 3 days to be ready.'}
        </div>
      </PopoverContent>
    </Popover>
  )
}
