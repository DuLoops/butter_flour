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

interface OrderDetails {
    id: string;
    customer_id: null | string;
    order_method: 'Delivery' | 'Pickup';
    date: Date;
    time: string;
    orders: OrderItem[];
    cartEmpty: boolean;
    deliveryAddress?: string; // Optional if the order is for delivery
}

interface OrderAction {
    type: string;
    payload: any;
}

export type { OrderDetails, OrderItem, OrderAction };
