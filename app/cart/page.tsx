"use client"
import React, { useContext, useState } from 'react';
import { OrderContext } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { MAX_QUANTITY } from '@/lib/constants';
import Image from 'next/image';

const formatCurrency = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(numberValue)) {
    return '';
  }
  return `$${numberValue.toFixed(2)}`;
};

export default function Cart() {
  const { state, dispatch } = useContext(OrderContext);
  const [items, setItems] = useState(state.orders);
  console.log(state)

  const formatPrice = (price: number) => `${price}`;

  const calculateTotal = () => {
    return state.orders.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

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

  if (state.cartEmpty) {
    return (
      <div className="container mx-auto p-8 text-center ">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4 gap-4 ">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col">
        {state.orders.map((item, index) => (
          <div key={`${item.cake_id}-${item.size}-${index}`}
            className="flex flex-row justify-between items-center p-4 border rounded-lg shadow">
            <div className="h-full">
              <h3 className="font-semibold">{item.cake_name}</h3>
              <Image src={item.cake_image} alt={item.cake_name} width={100} height={100} />
              <p className="text-gray-600 mt-1">Size: {item.size}</p>
              <p className="text-gray-600">Price: ${formatPrice(item.price)} each</p>
              {item.comment && <p className="text-gray-600">Note: {item.comment}</p>}
            </div>
            <div className="flex flex-col items-end gap-4 pt-3">
              <div className="flex items-center gap-2">
                <Button variant="outline"
                  onClick={() => updateQuantity(item.cake_id, item.size, item.quantity - 1)}
                  disabled={item.quantity <= 1}>
                  -
                </Button>
                <input
                  type="number"
                  value={item.quantity}
                  className="w-16 text-center border rounded p-1"
                />
                <Button variant="outline"
                  onClick={() => updateQuantity(item.cake_id, item.size, item.quantity + 1)}
                  disabled={item.quantity >= MAX_QUANTITY}>
                  +
                </Button>
              </div>

              <p className="w-24 text-right">$ {formatPrice(item.price * item.quantity)}</p>

              <Button variant="destructive"
                onClick={() => removeItem(item.cake_id, item.size)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p>Order Method: {state.order_method}</p>
            {/* <p>Date: {state.date.toLocaleDateString()}</p> */}
            <p>Time: {state.time}</p>
            {state.order_method === 'Delivery' && state.deliveryAddress && (
              <p>Delivery Address: {state.deliveryAddress}</p>
            )}
          </div>
          <div className="text-xl font-bold">
            Total: $ {formatPrice(calculateTotal())}
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-_pink" onClick={() => {/* Handle order completion */ }}>
            Complete Order
          </Button>
        </div>
      </div>
    </div>
  );
}
