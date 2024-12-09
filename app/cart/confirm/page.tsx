"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OrderDetails() {
    const searchParams = useSearchParams();
    return (
        <>
            <p>Order ID: <span className='text-blue-600' id="order-id">{searchParams.get('orderID')}</span></p>
        </>
    );
}

export default function Confirm() {
    return (
        <div className="max-w-2xl mx-auto p-4 text-center flex flex-col gap-1">
            <h1 className="text-3xl font-bold m-1">Thank you!</h1>
            <p className='mb-6'>We will contact you shortly to confirm your order.</p>
            <Suspense fallback={<p>Loading...</p>}>
                <OrderDetails />
            </Suspense>
            <p>Contact us: <a href="mailto:butterflourcake@gmail.com" className={'text-blue-600 underline'}>butterflourcake@gmail.com</a></p>
            <Link href="/" className='mt-10'>
                <button className="bg-_blue text-black py-2 px-6 rounded hover:bg-blue-600 ">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}
