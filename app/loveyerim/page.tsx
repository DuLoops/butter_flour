"use client"
import React from 'react'
import Password from './Password'
import Image from 'next/image';
import Confetti from 'react-confetti'
import { set } from 'date-fns';
enum pageState {
  unathenticated,
  authenticated,
  celebration
}


export default function Page() {
  const [pageState, setPageState] = React.useState("authenticated");
  const firstDate = new Date('2024-01-18');
  const today = new Date();
  const datingDays = Math.floor((today.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
  const [isConfettiVisible, setIsConfettiVisible] = React.useState(false);

  React.useEffect(() => {
    if (pageState === "authenticated") {
      setIsConfettiVisible(true);
    }
  }, [pageState]);

  React.useEffect(() => {
    if (isConfettiVisible) {
      const timeoutID = setTimeout(() => setIsConfettiVisible(false), 5000);
      return () => clearTimeout(timeoutID);
    }
  }, [isConfettiVisible]);
  return (
    <div>
      { pageState === "unathenticated" &&  
        (<Password setPageState={setPageState}/>)} 
          {pageState === "authenticated" &&
        (
         <div className = 'text-center '>
          {isConfettiVisible && <Confetti/>}
            <div className='flex flex-col justify-around px-2'>
            <h1 className='text-3xl mt-6'> Happy Birthday Yerim!</h1>
            <Image src='/svg/cake.svg' alt='cake' width={40} height={40} 
            className='rounded-full mx-auto my-6 w-[160px] h-[160px] object-contain' onClick={()=>setIsConfettiVisible(true)}/>
            <p className='mb-6'>I hope you are having a wonderful birthday :&#41;</p>
            <p>I can&apos;t believe it&apos;s been {datingDays} days since we started dating. Ever since that day, I&apos;ve loved you more and more.</p>
            <p></p>
            </div>
          </div>
        )}
    </div>
  )
}
