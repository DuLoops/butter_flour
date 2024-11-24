"use client"
import React, { useContext, useReducer, useEffect, useState } from 'react'
import Image from 'next/image'
import { Cake, CakeSize } from '@/types/Cake'
import { Button } from '../ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from '../ui/drawer';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { OrderContext } from '@/lib/cartContext';
import { Label } from "@/components/ui/label"
import { Cake } from 'lucide-react';

interface OrderDrawerProps {
    cake: Cake;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OrderState {
    quantities: { [key: string]: number };
    comment: string;
}

type OrderAction =
    | { type: 'SET_QUANTITY'; payload: { size: CakeSize, quantity: number } }
    | { type: 'SET_COMMENT'; payload: string }
    | { type: 'SET_ORDER'; payload: OrderState }
    | { type: 'SET_SIZE'; payload: CakeSize }

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
    switch (action.type) {
        case 'SET_QUANTITY':
            return {
                ...state,
                quantities: { ...state.quantities, [action.payload.size]: action.payload.quantity },
            };
        case 'SET_COMMENT':
            return {
                ...state,
                comment: action.payload,
            };
        case 'SET_ORDER':
            return action.payload;
        case 'SET_SIZE':
            return state; // No longer handling size in the reducer
        default:
            return state;
    }
};

const OrderDrawer: React.FC<OrderDrawerProps> = ({ cake, isDrawerOpen, setIsDrawerOpen }) => {
    const { state, dispatch } = useContext(OrderContext);
    const [orderState, orderDispatch] = useReducer(orderReducer, { quantities: {}, comment: '' });
    const [selectedSize, setSelectedSize] = useState<CakeSize>(cake.available_size[0]);


    useEffect(() => {
        const existingOrder = state.orders.find(order => order.cake_id === cake.id);
        if (existingOrder) {
            orderDispatch({ type: 'SET_ORDER', payload: existingOrder });
        }
    }, [cake.id]);

    const handleSubmit = () => {
        const existingOrder = state.orders.find(order => order.cake_id === cake.id);
        if (existingOrder) {
            if (confirm("This order already exists. Do you want to update it?")) {
                const updatedQuantities = { ...existingOrder.quantities };
                Object.keys(orderState.quantities).forEach(size => {
                    updatedQuantities[size as CakeSize] = (existingOrder.quantities[size as CakeSize] || 0) + orderState.quantities[size as CakeSize];
                });
                dispatch({
                    type: 'UPDATE_ITEM',
                    payload: {
                        cake_id: cake.id,
                        quantities: updatedQuantities,
                        comment: orderState.comment,
                    },
                });
            }
        } else {
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    cake_id: cake.id,
                    quantities: orderState.quantities,
                    comment: orderState.comment,
                },
            });
        }

        setIsDrawerOpen(false);
    };

    const setQuantity = (quantity: number) => {
        if (selectedSize) {
            orderDispatch({ type: 'SET_QUANTITY', payload: { size: selectedSize, quantity } });
        }
    };

    const setSpecialNote = (comment: string) => {
        orderDispatch({ type: 'SET_COMMENT', payload: comment });
    };

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <Button className="shadow m-2 bg-_pink" variant={'secondary'} onClick={() => setIsDrawerOpen(true)}>
                    Order
                </Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col justify-center items-center px-3">
                <DrawerHeader>
                    <DrawerTitle>{cake.name}</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription>
                    <Image
                        src={cake.image}
                        alt={cake.name}
                        width={460}
                        height={300}
                        className="h-[140px] object-contain rounded-t-lg m-1"
                    />
                    <p className='text-center'>{cake.desc}</p>
                    <div className="flex flex-col gap-4 items-stretch mt-2 rounded-xl border border-_blue border-2 p-2">
                        <p className='text-center'>Order Summary</p>
                        <div className="flex flex-row w-full justify-around">
                            <RadioGroup
                                value={selectedSize ? selectedSize.toString() : ''}
                                defaultValue={selectedSize}
                                onValueChange={(value) => setSelectedSize(value as CakeSize)}
                            >
                                {cake.available_size.map((size) => (
                                    <RadioGroupItem key={size} value={size} id={size} className="text-black">
                                        <Label htmlFor={size}>{size}</Label>
                                    </RadioGroupItem>
                                ))}
                            </RadioGroup>
                            <NumberInput quantity={selectedSize ? orderState.quantities[selectedSize] || 0 : 0} setQuantity={setQuantity}/>
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="comment">Special Note</Label>
                            <textarea
                                value={orderState.comment}
                                id='comment'
                                onChange={(e) => setSpecialNote(e.target.value)}
                                placeholder="Add a special note"
                                className="w-full h-24 p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </DrawerDescription>
                <DrawerFooter>
                    <Button variant={'secondary'} className="bg-_pink" onClick={handleSubmit}>
                        Add Order
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const NumberInput = ({ quantity, setQuantity }: { quantity: number; setQuantity: (quantity: number) => void }) => {
    const increment = () => setQuantity(quantity + 1);
    const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (

            <div className="relative flex items-center max-w-[8rem]">
                <button type="button" onClick={decrement} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                </button>
                <input type="text" value={quantity} readOnly className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button type="button" onClick={increment} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>

    );
};

export default OrderDrawer;
