import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { OrderDetails } from '@/types/order';

export default function useOrder() {
    useEffect(() => {
        const public_key = process.env.EMAILJS_PULIC_KEY;
        console.log(public_key);
        emailjs.init('82G2kc4aCnqBmcQit');
    }, []);
    
    const placeOrder = async (orderDetail: OrderDetails) => {
        const templateParameter = {
            pickupDate: orderDetail.pickupDate instanceof Date ? orderDetail.pickupDate.toLocaleDateString() : orderDetail.date,
            time: orderDetail.time,
            customer_name: orderDetail.customerName,
            customer_email: orderDetail.customerEmail,
            customer_phone: orderDetail.customerPhone,
            orders: orderDetail.orders.map(item => `${item.quantity} x ${item.cake_name} (size: ${item.size}) (price: ${item.price})`).join('\n'),
            total_price: orderDetail.totalPrice,
            orderDetails: JSON.stringify(orderDetail)
        }
        
        try {
            console.log(templateParameter);
            // await emailjs.send('service_98l5d1b', 'template_8k8umbo', templateParameter);
        } catch (err) {
            throw err;
        }
    };

    return { placeOrder };
}