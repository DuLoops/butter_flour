import { useEffect } from 'react';
import { OrderDetails, OrderProgress} from '@/types/Order';
import { saveOrderToFirestore, getOrderFromFirestore } from '@/lib/firebase';
import emailjs from '@emailjs/browser';

export default function useOrder() {

    const sendEmail = async (emailDetail: any) => {
        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string, 
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string, 
            emailDetail, 
            { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string }
        );
    }
    const placeOrder = async (orderDetail: OrderDetails) => {
        const completedOrderDetails = {
            ...orderDetail,
            orderProgress: OrderProgress.RECEIVED
        };
       
        
        const emailDetail= {
            pickupDate: orderDetail.pickupDate instanceof Date ? orderDetail.pickupDate.toLocaleDateString() : orderDetail.pickupDate,
            time: orderDetail.time,
            customer_name: orderDetail.customerName,
            customer_email: orderDetail.customerEmail,
            customer_phone: orderDetail.customerPhone,
            order_method: orderDetail.order_method,
            orders: orderDetail.orders.map(item => `${item.quantity} x ${item.cake_name} (size: ${item.size}) (price: ${item.price})`).join('\n'),
            total_price: orderDetail.totalPrice,
            orderDetails: JSON.stringify(orderDetail),
        };
        try {
            await saveOrderToFirestore(completedOrderDetails);
            await sendEmail(emailDetail);
        } catch (err) {
            throw err;
        }
    };

    const getOrder = async (orderId: string) => {
        try {
            const order = await getOrderFromFirestore(orderId);
            return order;
        } catch (err) {
            throw err;
        }
    };

    return { placeOrder, getOrder };
}