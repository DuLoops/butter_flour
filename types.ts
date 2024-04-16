interface CartItem {
    cake_id: string;
    customization_id?: string;  // Optional if not every cake is customized
}

interface Pickup {
    id: string;
    time: string; // You can use a more specific type like Date
}

interface Delivery {
    id: string;
    time: string; // Or Date
    address: string;
}

interface OrderDetails {
    id: string;
    customer_id: null| string;
    order_method: 'Delivery' | 'Pickup';
    cart: CartItem[];
    pickup?: Pickup; // Optional if the order is for pickup
    delivery?: Delivery; // Optional if the order is for delivery
}

interface Customer {
    id: string;
    name: string;
    phone_number: string;
    address?: string; // Optional if address is only needed for delivery
    email: string;
}

enum CakeSize {
    SIX_INCH = '6 Inch',
    EIGHT_INCH = '8 Inch' 
}

interface Cake {
    id: string;
    name: string;
    price: number;
    desc: string;
    release_date: string; // Or Date
    sale_quantity: number;
    available_size: CakeSize[];
}

interface Customization {
    id: string;
    order_id: string;
    cake_id: string;
    writing?: string; // Consider adding a maxLength constraint
    comment?: string;
    size: CakeSize;
}


export type {OrderDetails, Cake, Customization}