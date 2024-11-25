import {Cake, CakeSize} from '@/types/Cake'
const cakeData: Cake[] = [
    {
        id: 1,
        name: 'Victoria Cake',
        priceRange: '20.00 ~ 30.00',
        desc: 'Light pound cake with cream cheese cream, raspberry jam, and fresh garden toppings.',
        prices: {
            [CakeSize.SIX_INCH]: 20.00,
            [CakeSize.EIGHT_INCH]: 30.00
        },
        image: '/images/VictoriaCakeCrop.png',
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]
    },
    {
        id: 2,
        name: 'Flower Cake',
        priceRange: '25.50 ~ 35.50',
        desc: 'A delicious flower cake',
        prices: {
            [CakeSize.SIX_INCH]: 25.50,
            [CakeSize.EIGHT_INCH]: 35.50
        },
        image: '/images/reem/flower.jpeg',
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]
    },
    
];
export {cakeData};