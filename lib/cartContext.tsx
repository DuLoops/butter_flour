"use client"
import React, { createContext, useState, useEffect, useReducer } from 'react';
import { OrderDetails, OrderAction } from '@/types/Order';
import { v4 as uuidv4 } from 'uuid';
import useOrder from '@/hooks/useOrder';

const date = new Date()

const initialOrderDetails: OrderDetails = {
    id: uuidv4(),
    customer_id: null,
    order_method: 'Pickup',
    date: date,
    time: '',
    orders: [],
    cartEmpty: true,
};

const OrderContext = createContext<{ 
    state: OrderDetails, 
    dispatch: React.Dispatch<any> }>({ 
        state: initialOrderDetails, 
        dispatch: () => null });

const reducer = (state: OrderDetails, action: OrderAction): OrderDetails => {
    switch (action.type) {
        case 'SET_ORDER_METHOD': 
            return { ...state, order_method: action.payload };
        case 'SET_DATE':
            return {...state, date: action.payload}
        case 'SET_TIME':
            return {...state, time: action.payload}
        case 'ADD_ITEM':
            return { ...state, orders: [...state.orders, action.payload] }
        case 'UPDATE_ITEM':
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.cake_id === action.payload.cake_id
                        ? { ...order, quantity: action.payload.quantity }
                        : order
                ),
            };
        case 'REMOVE_ITEM':
            return { ...state, orders: state.orders.filter(item => item.cake_id !== action.payload) }
        case 'LOAD_ORDERS':
            return { ...state, orders: action.payload }
        case 'SET_CART_EMPTY':
            return { ...state, cartEmpty: action.payload };
        default:
            return state;
    }
}

function OrderProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(reducer, initialOrderDetails);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { placeOrder, loading, error } = useOrder();
    
    const handlePlaceOrder = async (cake_id: number, quantity: number) => {
        try {
            const order = await placeOrder(cake_id, quantity);
            console.log('Order placed:', order);
        } catch (err) {
            console.error('Error placing order:', err);
        }
    };

    useEffect(() => {
        // If authenticated, load orders from backend
        if (isAuthenticated) {
            //   loadOrdersFromBackend(); 
        }
    }, [isAuthenticated]);

    // useEffect(() => {
    //     const orders = localStorage.getItem('orders');
    //     if (orders) {
    //         dispatch({ type: 'LOAD_ORDERS', payload: JSON.parse(orders) });
    //     }
    // }, []);

    useEffect(() => {
        if (state.orders.length > 0) {
            dispatch({ type: 'SET_CART_EMPTY', payload: false });
        } else {
            dispatch({ type: 'SET_CART_EMPTY', payload: true });
        }
    }, [state.orders.length]);

    return (
        <OrderContext.Provider value={{
            state, dispatch, handlePlaceOrder, loading, error, 
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export { OrderContext, OrderProvider };