"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import React from 'react'
export default function Password({setPageState}:any) {
  const [value, setValue] = React.useState("")
  React.useEffect(() => {
    if (value == '516718') {
      setPageState("authenticated")
    }
    console.log(value)
  }, [value])

  return (
    <div className='flex flex-col justify-center items-center space-center h-40'>
      <InputOTP maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />  
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center mt-1">
        {value === "" ? (
          <>Enter your and my birthdays</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}
