"use client"
import React, { useContext, useReducer, useEffect, useState } from 'react'
import Image from 'next/image'
import { Cake, CakeSize } from '@/types/Cake'
import { Button } from '../ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from '../ui/drawer';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { OrderContext } from '@/lib/cartContext';
import { Label } from "@/components/ui/label"
import { MAX_QUANTITY } from '@/lib/constants';
import { IoClose } from "react-icons/io5";
import { DialogTitle } from '@radix-ui/react-dialog';

interface OrderDrawerProps {
    cake: Cake;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OrderState {
    quantity: number;
    size: CakeSize;
    comment: string;
}

type OrderAction =
    | { type: 'SET_QUANTITY'; payload: number }
    | { type: 'SET_COMMENT'; payload: string }
    | { type: 'SET_ORDER'; payload: OrderState }
    | { type: 'SET_SIZE'; payload: CakeSize }

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
    switch (action.type) {
        case 'SET_QUANTITY':
            return {
                ...state,
                quantity: action.payload,
            };
        case 'SET_COMMENT':
            return {
                ...state,
                comment: action.payload,
            };
        case 'SET_SIZE':
            return {
                ...state,
                size: action.payload,
            };
        case 'SET_ORDER':
            return action.payload;
        default:
            return state;
    }
};

const OrderDrawer: React.FC<OrderDrawerProps> = ({ cake, isDrawerOpen, setIsDrawerOpen }) => {
    const { state, dispatch } = useContext(OrderContext);
    const [orderState, orderDispatch] = useReducer(orderReducer, { quantity: 1, size: cake.available_size[0], comment: '' });

    const formatPrice = (price: number) => `${price.toFixed(2)}`;
    console.log(state.orders)


    const handleSubmit = () => {
        if (orderState.quantity === 0) {
            setIsDrawerOpen(false);
            return;
        }
        const existingOrder = state.orders.find(order => order.cake_id === cake.id && order.size === orderState.size);
        if (existingOrder) {
            if (confirm("Update order?")) {
                dispatch({
                    type: 'UPDATE_ITEM',
                    payload: {
                        cake_id: cake.id,
                        quantity: orderState.quantity,
                        size: orderState.size,
                        comment: orderState.comment,
                    },
                });
            }
        } else {
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    cake_id: cake.id,
                    quantity: orderState.quantity,
                    size: orderState.size,
                    comment: orderState.comment,
                },
            });
        }

        setIsDrawerOpen(false);
    };

    const setQuantity = (quantity: number) => {
        orderDispatch({ type: 'SET_QUANTITY', payload: quantity });
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
                        <DialogTitle className="text-xl mt-1 font-bold text-black">{cake.name}</DialogTitle>
                </DrawerHeader>
                <DrawerDescription className=''>
                    <div className='flex flex-col p-3 gap-3'>
                        <Image
                            src={cake.image}
                            alt={cake.name}
                            width={460}
                            height={300}
                            className="h-[140px] object-contain rounded-t-lg m-1 mt-2"
                        />
                        <p className=''>{cake.desc}</p>
                    </div>
                    <div className="flex flex-col gap-4 items-stretch mt-2 rounded-xl border-_blue border-2 p-4">
                        <p className=''>Order Summary</p>
                        <NumberInput quantity={orderState.quantity} setQuantity={setQuantity} />
                        <div className='flex flex-row items-center gap-8'>
                            <Label htmlFor="Option" className=''>Option:</Label>
                            <RadioGroup
                                value={orderState.size.toString()}
                                id='Option'
                                onValueChange={(value) => orderDispatch({ type: 'SET_SIZE', payload: value as CakeSize })}
                            >
                                {cake.available_size.map((size) => (
                                    <RadioGroupItem key={size} value={size} id={size} className="text-black">
                                        <Label htmlFor={size}>
                                            {`${size} ($${cake.prices[size]})`}
                                        </Label>
                                    </RadioGroupItem>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="comment">Special Request</Label>
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
                <DrawerFooter className='flex flex-row'>
                    <button className="size-10 bg-_white rounded-lg shadow" onClick={() => setIsDrawerOpen(false)}>
                        <IoClose className='size-7 m-auto' />
                    </button>
                    <Button variant={'secondary'} className="bg-_pink ml-2 h-10 shadow" onClick={handleSubmit}>
                        Add to order {'$' + formatPrice(orderState.quantity * cake.prices[orderState.size])}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const NumberInput = ({ quantity, setQuantity }: { quantity: number; setQuantity: (quantity: number) => void }) => {
    const increment = () => setQuantity(quantity < MAX_QUANTITY ? quantity + 1 : MAX_QUANTITY);
    const decrement = () => setQuantity(quantity > 2 ? quantity - 1 : 1);

    return (
        <div className="relative flex items-center max-w-[8rem]">
            <button
                type="button"
                onClick={decrement}
                disabled={quantity <= 1}
                className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50`}
            >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
            </button>
            <input
                type="text"
                value={quantity}
                readOnly
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
                type="button"
                onClick={increment}
                disabled={quantity >= MAX_QUANTITY}
                className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50`}
            >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
            </button>
        </div>
    );
};

export default OrderDrawer;
