import { CakeSize } from "./Cake";

interface OrderItem {
    cake_id: number;
    quantity: number;
    size: CakeSize;
    comment: string;
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
