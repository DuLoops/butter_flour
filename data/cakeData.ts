import {Cake, CakeSize} from '@/types/Cake'
const cakeData: Cake[] = [
    {
        id: 1,
        name: 'Victoria Cake',
        priceRange: '23.00 ~ 65.00',
        desc: 'Light pound cake with cream cheese frosting, raspberry jam, and fresh garden toppings.',
        prices: {
            [CakeSize.FOUR_INCH]: 23.00,
            [CakeSize.SIX_INCH]: 45.00,
            [CakeSize.EIGHT_INCH]: 65.00
        },
        images: ['/images/menu/v.png', '/images/menu/v2.jpeg', '/images/menu/v3.jpeg',  '/images/menu/v4.jpeg'],
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]
    },
    {
        id: 2,
        name: 'Foggy Chocolate Cake',
        priceRange: '23.00 ~ 65.00',
        desc: 'Chocolate cake with a crispy crust, soft and moist center, topped with rich cream.',
        prices: {
            [CakeSize.FOUR_INCH]: 23.00,
            [CakeSize.SIX_INCH]: 45.00,
            [CakeSize.EIGHT_INCH]: 65.00
        },
        images: ['/images/menu/c.png', '/images/menu/c2.jpeg',],
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]
    },
    {
        id: 3,
        name: 'SweetPotato Cake',
        priceRange: '23.00 ~ 65.00',
        desc: 'Soft cake topped with creamy sweet potato mousse.',
        prices: {
            [CakeSize.FOUR_INCH]: 23.00,
            [CakeSize.SIX_INCH]: 45.00,
            [CakeSize.EIGHT_INCH]: 65.00
        },
        images: ['/images/menu/s.png', '/images/menu/s2.jpeg'],
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]

    }
    
];
export {cakeData};