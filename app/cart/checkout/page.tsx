"use client"
import { useContext, useState, useEffect } from 'react';
import { OrderContext } from '@/lib/cartContext';
import useOrder from '@/hooks/useOrder';
import OrderMethod from '@/components/order/OrderMethod';
import OrderTime from '@/components/order/OrderTime';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from "date-fns"

export default function CheckoutPage() {
    const router = useRouter();
    const { state, dispatch } = useContext(OrderContext);
    const { placeOrder } = useOrder();
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOrderReady, setIsOrderReady] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (state.pickupDate === null || state.time === null) {
            setFormError('Please select a date and time');
            return;
        }
        
        // Validate delivery address if delivery method is selected
        if (state.order_method === 'Delivery' && !formData.get('address')) {
            setFormError('Delivery address is required');
            setLoading(false);
            return;
        }
        setLoading(true);

        // Update context with customer info and address
        dispatch({
            type: 'SET_CUSTOMER_INFO',
            payload: {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone')
            }
        });

        if (state.order_method === 'Delivery') {
            dispatch({
                type: 'SET_DELIVERY_ADDRESS',
                payload: formData.get('address')
            });
        }

        // Set the flag to indicate that the order is ready to be placed
        setIsOrderReady(true);
    };

    useEffect(() => {
        if (isOrderReady) {
            try {
                placeOrder(state);
            } catch (err) {
                setFormError('Failed to place order. Please try again.');
            } finally {
                const params = new URLSearchParams({
                    orderID: state.orderId
                });
                router.push(`/cart/confirm?${params.toString()}`);
                dispatch({ type: 'CLEAR_CART' });
                setLoading(false);
            }
        }
    }, [isOrderReady]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Link href="/cart">
            <button 
                className="mb-6 flex items-center text-blue-500 hover:text-blue-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Cart
            </button>
                </Link>
            <div className="mt-1 pt-2 border-t-2">
        <OrderMethod />
        <OrderTime />
        </div>
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name *</label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        className="w-full border p-2 rounded"
                    />
                </div>
                
                <div>
                    <label className="block mb-1">Email *</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full border p-2 rounded"
                    />
                </div>
                
                <div>
                    <label className="block mb-1">Phone (optional)</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        className="w-full border p-2 rounded"
                    />
                </div>

                {state.order_method === 'Delivery' && (
                    <div>
                        <label className="block mb-1">Delivery Address *</label>
                        <input 
                            type="text" 
                            name="address" 
                            required 
                            className="w-full border p-2 rounded"
                            placeholder="Enter your delivery address"
                        />
                    </div>
                )}

                <div className="border-t pt-4 mt-4 flex flex-col gap-1">
                    <p>Order Method: {state.order_method}</p>
                    <p>Delivery Date: {state.pickupDate && format(state.pickupDate, "PPP")}</p>
                    <p>Delivery Time: {state.time}</p> 
                    {state.order_method === 'Delivery' && <p>Delivery Address: {state.deliveryAddress}</p>}
                    <p className="font-bold">Total: ${state.totalPrice.toFixed(2)}</p>
                </div>

                {formError && (
                    <p className="text-red-500">{formError}</p>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-_pink text-black py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Processing...
                        </span>
                    ) : 'Place Order'}
                </button>
            </form>
        </div>
    );
}
