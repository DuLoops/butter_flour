interface Customer {
    id: string;
    name: string;
    phone_number: string;
    address?: string; // Optional if address is only needed for delivery
    email: string;
}

enum CakeSize {
    FOUR_INCH = "4 '",
    SIX_INCH = "6 '",
    EIGHT_INCH = "8 '"
}

interface Cake {
    id: number;
    name: string;
    priceRange: string;
    desc: string;
    images: string[];
    release_date?: string; // Or Date
    sale_quantity?: number;
    available_size: CakeSize[];
    prices: { [key in CakeSize]: number };
}

interface Customization {
    id: string;
    order_id: string;
    cake_id: string;
    writing?: string; // Consider adding a maxLength constraint
    comment?: string;
    size: CakeSize;
}

export type { Cake, Customization };
export { CakeSize };