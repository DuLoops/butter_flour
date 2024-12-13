"use client"
import React, { createContext, useState, useEffect, useReducer } from 'react';
import { OrderDetails, OrderAction } from '@/types/Order';
import { v4 as uuidv4 } from 'uuid';
import useOrder from '@/hooks/useOrder';
import { CakeSize } from '@/types/Cake';
const date = new Date()

const generateOrderId = () => {
    const datePart = `${date.getDate()}${date.getMonth() + 1}`; // date and month
    const randomPart = Math.random().toString(36).substring(2, 7)
    return datePart + randomPart;
};

const initialOrderDetails: OrderDetails = {
    orderId: generateOrderId(),
    customer_id: null,
    order_method: 'Pickup',
    orderDate: date,
    pickupDate: null,
    time: null,
    orders: [],
    deliveryAddress: '',  // Add default delivery address
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    persistedCart: false,
    totalPrice: 0,
    deliveryFee: 0  // Add default delivery fee
};

const OrderContext = createContext<{ 
    state: OrderDetails, 
    dispatch: React.Dispatch<any> }>({ 
        state: initialOrderDetails, 
        dispatch: () => null });

const reducer = (state: OrderDetails, action: OrderAction): OrderDetails => {
    switch (action.type) {
        case 'SET_ORDER_METHOD': 
            return { 
                ...state, 
                order_method: action.payload,
                deliveryFee: action.payload === 'Delivery' ? 5 : 0  // Set delivery fee
            };
        case 'SET_DATE':
            return {...state, pickupDate: action.payload}
        case 'SET_TIME':
            return {...state, time: action.payload}
        case 'ADD_ITEM':
            return { 
                ...state, 
                orders: [...state.orders, action.payload],
            };
        case 'UPDATE_ITEM':
            return {
                ...state,
                orders: state.orders.map(item => {
                    if (item.cake_id === action.payload.cake_id && item.size === action.payload.size) {
                        return action.payload;
                    }
                    return item;
                }),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                orders: state.orders.map(item => {
                    if (item.cake_id === action.payload.cake_id && item.size === action.payload.size) {
                        return { ...item, quantity: action.payload.quantity };
                    }
                    return item;
                }),
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                orders: state.orders.filter(item => 
                    !(item.cake_id === action.payload.cake_id && item.size === action.payload.size)
                ),
            }
        case 'LOAD_PERSISTED_STATE':
            return { ...state, orders: action.payload, persistedCart: true };
        case 'SET_DELIVERY_ADDRESS':
            return { ...state, deliveryAddress: action.payload };
        case 'SET_CUSTOMER_INFO':
            return { ...state, 
                customerName: action.payload.name,
                customerEmail: action.payload.email,
                customerPhone: action.payload.phone
            };
        case 'SET_TOTAL_PRICE':
            return { ...state, totalPrice: action.payload };
        case 'CLEAR_CART':
            return { ...initialOrderDetails };
        default:
            return state;
    }
}

function OrderProvider({ children }: { children: React.ReactNode }) {
    
    const [state, dispatch] = useReducer(reducer, initialOrderDetails);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load persisted state only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const persistedCart = localStorage.getItem('cart');
            if (persistedCart)  {
                const parsedCart = JSON.parse(persistedCart) ;
                dispatch({ type: 'LOAD_PERSISTED_STATE', payload: parsedCart });
            }
        }
    }, []);

    useEffect(() => {
        const totalPrice = state.orders.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (state.deliveryFee || 0);
        dispatch({ type: 'SET_TOTAL_PRICE', payload: totalPrice });
    }, [state.orders, state.deliveryFee]);

    // Save state to localStorage only on client side
    useEffect(() => {
        if (typeof window !== 'undefined' && state.persistedCart == true) {
            localStorage.setItem('cart', JSON.stringify(state.orders));
        }
    }, [state.orders, state.persistedCart]);

    useEffect(() => {
        // If authenticated, load orders from backend
        if (isAuthenticated) {
            //   loadOrdersFromBackend(); 
        }
    }, [isAuthenticated]);

    return (
        <OrderContext.Provider value={{
            state, dispatch
        }}>
            {children}
        </OrderContext.Provider>);
}

export { OrderContext, OrderProvider };
