import React from 'react'
import { Parallax } from 'react-scroll-parallax'
import Image from 'next/image';
import LaughMachine from './LaughMachine';
export default function Content({ setIsConfettiVisible }: { setIsConfettiVisible: any }) {
    const firstDate = new Date('2024-01-18');
    const today = new Date();
    const datingDays = Math.floor((today.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
    return (
        <>
            <h1 className='text-3xl mt-[200px]'> Happy Girlfriend day to the best girlfriend!</h1>
            <Parallax speed={10}>
                <Image src='/images/VictoriaCake.png' alt='cake' width={160} height={160} className='rounded-full mx-auto my-6 w-[160px] h-[160px] object-contain' onClick={() => setIsConfettiVisible(true)} />
            </Parallax>
            <Parallax className='my-[100px]' speed={5}>
                <p>I hope you are having a wonderful day :&#41;</p>
                <p className='mt-2'>It&apos;s been <span className='text-red-600'>{datingDays}</span> days since we started dating. <br/>Ever since that day, I love you more and more everyday</p>
            </Parallax>

            <Parallax speed={50} translateX={['500px', '-500px']} translateY={['-500px','500px']} className='w-[100px] absolute right-1'>
                <Image src='/images/shooting-star.png' alt='flower' width={100} height={100} className='' />
            </Parallax>
            <Image src='/images/bf.png' alt='flower' width={400} height={600} className='' />
            <Parallax translateY={[-20, 10]} rotate={[-180,180]}>
                <Image src='/images/reem/shield.png' alt='v' width={100} height={100} />
            </Parallax>
                <p className='mx-2'>내 청춘을 너와 보낼수있어서 행복하고 고마워.<br/> 우리 재밌는거 많이하고 후회없이 사랑하자</p>
            <Parallax speed={30} className='h-[100px]'>
                <Image src='/images/reem/flower.jpeg' alt='flower' width={200} height={200} className='absolute top-2 right-[50px]' />
            </Parallax>
            <Parallax speed={20}>
                <Image src='/images/reem/campingBreakfast.jpeg' alt='flower' width={200} height={200}  className='mx-auto mt-[100px]'/>
            </Parallax>
            <Image src='/images/reem/sunsetPose.jpeg' alt='flower' width={200} height={200} className='' />
            <Image src='/images/us/sunset.jpeg' alt='flower' width={400} height={200} className='mx-auto' />
            <LaughMachine/>
        </>
    )
}
