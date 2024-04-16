"use client"
import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import { OrderDetails } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface OrderAction {
    type: string;
    payload: any;
}

const initialOrderDetails: OrderDetails = {
    id: uuidv4(),
    authenicated: false,
    customer_id: null,
    order_method: 'Pickup',
    cart: [],
};

const OrderContext = createContext<{ 
    state: OrderDetails, 
    dispatch: React.Dispatch<any> }>({ 
        state: initialOrderDetails, 
        dispatch: () => null });

const reducer = (state: OrderDetails, action: OrderAction): OrderDetails => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, cart: [...state.cart, action.payload] };
        // ... other cases
        default:
            return state;
    }
}

function OrderProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(reducer, initialOrderDetails);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // If authenticated, load orders from backend
        if (isAuthenticated) {
            //   loadOrdersFromBackend(); 
        } else {
            //   loadOrdersFromLocalStorage();
        }
    }, [isAuthenticated]);

    // ... Helper functions to load/save orders to backend or localStorage

    return (
        <OrderContext.Provider value={{
            state, dispatch
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export { OrderContext, OrderProvider }; // We only export OrderProvider here
