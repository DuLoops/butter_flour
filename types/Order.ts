import { CakeSize } from "./Cake";

interface OrderItem {
    cake_id: number;
    cake_name: string;  // Add cake name field
    cake_image: string;  
    quantity: number;
    size: CakeSize;
    comment: string;
    price: number;  // Add price field
}

export enum OrderProgress {
    RECEIVED = 'Order received, waiting for confirmation',
    CONFIRMED = 'Order confirmed, preparing for pickup',
    READY = 'Order ready for pickup',
    DELIVERED = 'Order delivered',
    CANCELLED = 'Order cancelled'
}

interface OrderDetails {
    orderId: string;
    customer_id: null | string;
    order_method: 'Delivery' | 'Pickup';
    orderDate: Date;
    pickupDate: Date | null;
    time: string | null;
    orders: OrderItem[];
    deliveryAddress?: string; // Optional if the order is for delivery
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    persistedCart: boolean; 
    totalPrice: number;
    OrderProgress?: string;  // Add order progress field
}

interface OrderAction {
    type: string;
    payload: any;
}

export type { OrderDetails, OrderItem, OrderAction };
