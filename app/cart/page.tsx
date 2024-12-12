"use client"
import React, { useContext, useState } from 'react';
import { OrderContext } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { MAX_QUANTITY } from '@/lib/constants';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import Link from 'next/link'

const formatPrice = (value: number) => {
  if (isNaN(value)) {
    return '';
  }
  return `${value.toFixed(2)}`;
};


export default function Cart() {
  const { state, dispatch } = useContext(OrderContext);

  const updateQuantity = (cake_id: number, size: string, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > MAX_QUANTITY) return;

    if (newQuantity === 0) {
      removeItem(cake_id, size);
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          cake_id,
          size,
          quantity: newQuantity
        }
      });
    }
  };

  const removeItem = (cake_id: number, size: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { cake_id, size }
    });
  };

  if (state.orders.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center ">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4 gap-4 ">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {state.orders.map((item, index) => (
          <div key={`${item.cake_id}-${item.size}-${index}`}
          className="p-2 border rounded-lg shadow bg-white"
          >
          <h3 className="font-semibold">{item.cake_name}</h3>
          <div className="flex justify-between">
            <div className="h-full">
              <Image src={item.cake_image} alt={item.cake_name} width={100} height={100} />
              <p className="text-gray-600 mt-1">Size: {item.size}</p>
              <p className="text-gray-600">Price: ${item.price} each</p>
              {item.comment && <p className="text-gray-600">Note: {item.comment}</p>}
            </div>
            <div className="flex flex-col items-end mt-2 justify-between p-2">
              <div className="flex items-center gap-1">
                <Button variant="outline"
                  onClick={() => updateQuantity(item.cake_id, item.size, item.quantity - 1)}
                  disabled={item.quantity <= 1}>
                  -
                </Button>
                <input
                  type="number"
                  value={item.quantity}
                  className="w-16 text-center border rounded p-1"
                  readOnly
                />
                <Button variant="outline"
                  onClick={() => updateQuantity(item.cake_id, item.size, item.quantity + 1)}
                  disabled={item.quantity >= MAX_QUANTITY}>
                  +
                </Button>
              </div>
              <p className="w-24 text-right ">$ {formatPrice(item.price * item.quantity)}</p>
              <button
                onClick={() => removeItem(item.cake_id, item.size)}>
                <FaRegTrashAlt className='size-4' />
              </button>
            </div>
            </div>
          </div>
        ))}
          <Button className="bg-_pink w-3/4 text-black mx-auto"  >
        <Link href="/cart/checkout">
            Checkout ${formatPrice(state.totalPrice)}
          </Link>
          </Button>
    </div>
  );
}
