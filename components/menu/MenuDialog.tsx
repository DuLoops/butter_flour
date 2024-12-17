"use client"
import React, { useState, useContext, useReducer, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Cake, CakeSize } from '@/types/Cake'
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { OrderContext } from '@/lib/cartContext';
import { Label } from "@/components/ui/label"
import { IoClose } from "react-icons/io5";
import ImageCarousel from './ImageCarousel'
import NumberInput from '@/components/ui/NumberInput'

interface OrderDrawerProps {
    cake: Cake;
}

interface OrderState {
    quantity: number;
    size: CakeSize;
    comment: string;
    writing?: string;
    isGlutenFree: boolean;
}

type OrderAction =
    | { type: 'SET_QUANTITY'; payload: number }
    | { type: 'SET_COMMENT'; payload: string }
    | { type: 'SET_ORDER'; payload: OrderState }
    | { type: 'SET_SIZE'; payload: CakeSize }
    | { type: 'SET_WRITING'; payload: string }
    | { type: 'SET_GLUTEN_FREE'; payload: boolean }

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
        case 'SET_GLUTEN_FREE':
            return {
                ...state,
                isGlutenFree: action.payload,
            };
        default:
            return state;
    }
};

const MenuDialog: React.FC<OrderDrawerProps> = ({ cake}) => {
    const formatPrice = (price: number) => `${price.toFixed(2)}`;
    const { state, dispatch } = useContext(OrderContext);
    const [orderState, orderDispatch] = useReducer(orderReducer, { quantity: 1, size: cake.available_size[0], comment: '', isGlutenFree: false });
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(()=> {
        const cakeName = searchParams.get('cake');
        if (cakeName === cake.name) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isOpen) {
            router.push(`?cake=${cake.name}`, {scroll: false});
        } else {
            router.push(pathName, {scroll: false});
        }
    }, [isOpen])

    const handleSubmit = () => {
        const price = cake.prices[orderState.size] + (orderState.isGlutenFree ? 2 : 0);
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
                    price: price,
                    isGlutenFree: orderState.isGlutenFree,
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
                    price: price,
                    isGlutenFree: orderState.isGlutenFree,
                },
            });
        }


    };

    const setQuantity = (quantity: number) => {
        orderDispatch({ type: 'SET_QUANTITY', payload: quantity });
    };

    const setSpecialNote = (comment: string) => {
        orderDispatch({ type: 'SET_COMMENT', payload: comment });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(o)=>setIsOpen(o)}>
            <DialogTrigger asChild>
                <Button >
                    Order
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-around items-center lg:p-20 p-2">
                <DialogHeader>
                    <DialogTitle className="text-lg mt-1 font-bold text-black">{cake.name}</DialogTitle>
                </DialogHeader>
                <div className={'flex flex-col items-center justify-center px-4'}>
                    <ImageCarousel images={cake.images} />
                    <DialogDescription>{cake.desc}</DialogDescription>
                </div>
                <div className="flex flex-col gap-2 items-stretch mt-1 rounded-xl border-_blue border-2 p-3 w-full">
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <Label htmlFor="Quantity" className='m-1' >Quantity:</Label>
                        <NumberInput quantity={orderState.quantity} setQuantity={setQuantity} />
                    </div>
                    <div className='flex flex-row items-start gap-10 justify-between'>
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
                        <div>
                            <Label htmlFor="GlutenFree">Options</Label>
                            <RadioGroup
                                value={orderState.isGlutenFree.toString()}
                                id='GlutenFree'
                                onValueChange={(value) => orderDispatch({ type: 'SET_GLUTEN_FREE', payload: value === 'true' })}
                            >
                                <RadioGroupItem value="false" id="glutenFreeNo" className="text-black">
                                    <Label htmlFor="glutenFreeNo">None</Label>
                                </RadioGroupItem>
                                <RadioGroupItem value="true" id="glutenFreeYes" className="text-black">
                                    <Label htmlFor="glutenFreeYes">Gluten free (+$2.00)</Label>
                                </RadioGroupItem>
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
                            className="w-full h-14 p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <DialogFooter className='flex flex-row'>
                    <button className="size-10 bg-_white rounded-lg shadow" onClick={() => setIsOpen(false)}>
                        <IoClose className='size-7 m-auto' />
                    </button>
                    <Button variant={'secondary'} className="bg-_pink ml-2 h-10 shadow" onClick={handleSubmit}>
                        Add to order {'$' + formatPrice(orderState.quantity * (cake.prices[orderState.size] + (orderState.isGlutenFree ? 2 : 0)))}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default MenuDialog;
