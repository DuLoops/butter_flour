"use client"

import {useContext} from "react"
import { format } from "date-fns"
import { FaRegCalendarAlt } from "react-icons/fa";
import { cn } from "@/lib/utils"
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

    const setDate = (day: Date | undefined) => {
        dispatch({type:'SET_DATE', payload:(day)})
    }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-2/3 justify-between font-normal px-2",
            !state.date && "text-muted-foreground"
          )}
        >
          {state.date ? format(state.date, "PPP") : <span>Pick a date</span>}
          <FaRegCalendarAlt className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={state.date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
