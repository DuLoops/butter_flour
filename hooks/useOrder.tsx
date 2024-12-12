import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { OrderDetails } from '@/types/Order';

export default function useOrder() {
    useEffect(() => {
        const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
        if (!emailJsPublicKey) {
            throw new Error('EMAILJS_PUBLIC_KEY is not defined');
        }
        emailjs.init(emailJsPublicKey);    }, []);
    
    const placeOrder = async (orderDetail: OrderDetails) => {
        const templateParameter = {
            pickupDate: orderDetail.pickupDate instanceof Date ? orderDetail.pickupDate.toLocaleDateString() : orderDetail.pickupDate,
            time: orderDetail.time,
            customer_name: orderDetail.customerName,
            customer_email: orderDetail.customerEmail,
            customer_phone: orderDetail.customerPhone,
            orders: orderDetail.orders.map(item => `${item.quantity} x ${item.cake_name} (size: ${item.size}) (price: ${item.price})`).join('\n'),
            total_price: orderDetail.totalPrice,
            orderDetails: JSON.stringify(orderDetail)
        }
        
        try {
            const service_id = process.env.EMAILJS_SERVICE_ID;
            const template_id = process.env.EMAILJS_TEMPLATE_ID;
            console.log(service_id);
            console.log(templateParameter);
            // await emailjs.send(service_id, template_id, templateParameter);
        } catch (err) {
            throw err;
        }
    };

    return { placeOrder };
}