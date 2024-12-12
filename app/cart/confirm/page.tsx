"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import useOrder from '@/hooks/useOrder';

function OrderDetails() {
    const searchParams = useSearchParams();
    const { getOrder } = useOrder();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const orderId = searchParams.get('orderID');
            if (orderId) {
                const orderData = await getOrder(orderId);
                setOrder(orderData);
            }
        };
        fetchOrder();
    }, [searchParams, getOrder]);

    if (!order) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className='m-2 text-left bg-white rounded-lg p-2 flex flex-col gap-1'>
            <p>Order ID: <span className='text-blue-600' id="order-id">{searchParams.get('orderID')}</span></p>
            <p>Pickup Date: {new Date(order.pickupDate).toLocaleDateString()}</p>
            <p>Time: {order.time}</p>
            <p>Orders: <br/>{order.orders.map(item => `${item.quantity} x ${item.cake_name} (size: ${item.size}) (price: ${item.price})`).join(', ')}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Order Progress: {order.orderProgress}</p>
        </div>
    );
}

export default function Confirm() {
    return (
        <div className="max-w-2xl mx-auto p-4 text-center flex flex-col gap-2">
            <h1 className="text-3xl font-bold m-1">Thank you!</h1>
            <p className=''>We will contact you shortly to confirm your order.</p>
            <p>Contact us: <a href="mailto:butterflourcake@gmail.com" className={'text-blue-600 underline'}>butterflourcake@gmail.com</a></p>
            <Suspense fallback={<p>Loading...</p>}>
                <OrderDetails />
            </Suspense>
            <Link href="/" className='mt-10'>
                <button className="bg-_blue text-black py-2 px-6 rounded hover:bg-blue-600 ">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}
