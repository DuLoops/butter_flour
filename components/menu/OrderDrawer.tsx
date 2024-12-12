"use client"
import React, { useContext, useReducer, useEffect, useState } from 'react'
import Image from 'next/image'
import { Cake, CakeSize } from '@/types/Cake'
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { OrderContext } from '@/lib/cartContext';
import { Label } from "@/components/ui/label"
import { MAX_QUANTITY } from '@/lib/constants';
import { IoClose } from "react-icons/io5";
import ImageCarousel from './ImageCarousel'
interface OrderDrawerProps {
    cake: Cake;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OrderState {
    quantity: number;
    size: CakeSize;
    comment: string;
    writing?: string;
}

type OrderAction =
    | { type: 'SET_QUANTITY'; payload: number }
    | { type: 'SET_COMMENT'; payload: string }
    | { type: 'SET_ORDER'; payload: OrderState }
    | { type: 'SET_SIZE'; payload: CakeSize }
    | { type: 'SET_WRITING'; payload: string }

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
    const formatPrice = (price: number) => `${price.toFixed(2)}`;
    const { state, dispatch } = useContext(OrderContext);
    const [orderState, orderDispatch] = useReducer(orderReducer, { quantity: 1, size: cake.available_size[0], comment: '' });

    const handleSubmit = () => {
        if (state.orders.some(item => item.cake_id === cake.id && item.size === orderState.size)) {
            dispatch({
                type: 'UPDATE_ITEM',
                payload: {
                    cake_id: cake.id,
                    cake_name: cake.name,
                    cake_image: cake.images[0],
                    quantity: orderState.quantity,
                    size: orderState.size,
                    comment: orderState.comment,
                    price: cake.prices[orderState.size],
                },
            });
        } else {
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    cake_id: cake.id,
                    cake_name: cake.name,
                    cake_image: cake.images[0],
                    quantity: orderState.quantity,
                    size: orderState.size,
                    comment: orderState.comment,
                    price: cake.prices[orderState.size],
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
        <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen} >
            <DialogTrigger asChild>
                <Button className="shadow bg-_pink" variant={'secondary'} onClick={() => setIsDrawerOpen(true)}>
                    Order
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-around items-center px-3">
                <DialogHeader>
                    <DialogTitle className="text-lg mt-1 font-bold text-black">{cake.name}</DialogTitle>
                </DialogHeader>
                <div className={'flex flex-col items-center justify-center px-4'}>
                    <ImageCarousel images={cake.images} />
                    <DialogDescription>{cake.desc}</DialogDescription>
                </div>
                <div className="flex flex-col gap-2 items-stretch mt-2 rounded-xl border-_blue border-2 p-2 w-full">
                    <div className='flex flex-row items-center gap-10'>
                        <div>
                            <Label htmlFor="Quantity" className='m-1' >Quantity:</Label>
                            <NumberInput quantity={orderState.quantity} setQuantity={setQuantity} />
                        </div>
                        <div>
                            <Label htmlFor="Size">Size:</Label>
                            <RadioGroup
                                value={orderState.size.toString()}
                                id='Size'
                                onValueChange={(value) => orderDispatch({ type: 'SET_SIZE', payload: value as CakeSize })}
                            >
                                {cake.available_size.map((size) => (
                                    <RadioGroupItem key={size} value={size} id={size} className="text-black">
                                        <Label htmlFor={size}>{`${size} ($${cake.prices[size]})`}</Label>
                                    </RadioGroupItem>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="comment" className='m-1'>Special Request</Label>
                        <textarea
                            value={orderState.comment}
                            id='comment'
                            onChange={(e) => setSpecialNote(e.target.value)}
                            placeholder="Add a special note"
                            className="w-full h-24 p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <DialogFooter className='flex flex-row'>
                    <button className="size-10 bg-_white rounded-lg shadow" onClick={() => setIsDrawerOpen(false)}>
                        <IoClose className='size-7 m-auto' />
                    </button>
                    <Button variant={'secondary'} className="bg-_pink ml-2 h-10 shadow" onClick={handleSubmit}>
                        Add to order {'$' + formatPrice(orderState.quantity * cake.prices[orderState.size])}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const NumberInput = ({ quantity, setQuantity }: { quantity: number; setQuantity: (quantity: number) => void }) => {
    const increment = () => {
        if (quantity < MAX_QUANTITY) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= MAX_QUANTITY) {
            setQuantity(value);
        }
    };

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
                type="number"
                value={quantity}
                onChange={handleQuantityInput}
                min={1}
                max={MAX_QUANTITY}
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-10"
                readOnly

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
