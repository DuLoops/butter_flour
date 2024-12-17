"use client"
import { Button } from "@/components/ui/button"
import Landing from "./Landing"
import Order from "./Order"
import { sendEmailToAdmin } from "@/lib/firebase"
export default function Home() {

  return (
      <div className='w-screen overflow-x-hidden box-border md:p-5 lg:p-10 flex flex-col'>
        <Landing />
        <Order />
      </div>
  )}
  