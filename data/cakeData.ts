import {Cake, CakeSize} from '@/types/Cake'
const cakeData: Cake[] = [
    {
        id: 1,
        name: 'Victoria Cake',
        desc: 'Light pound cake with cream cheese cream, raspberry jam, and fresh garden toppings.',
        price: 20,
        image: '/images/VictoriaCakeCrop.png',
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]
    },
    {
        id: 2,
        name: 'Flower Cake',
        desc: 'A delicious flower cake',
        price: 25,
        image: '/images/reem/flower.jpeg',
        available_size: [CakeSize.SIX_INCH, CakeSize.EIGHT_INCH]
    },
    
];
export {cakeData};