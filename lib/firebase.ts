'use server'
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

import OrderDetails from '@/types/OrderDetails';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
// const auth = getAuth(app);

export const saveOrderToFirestore = async (orderDetail: OrderDetails) => {
    try {
        const docRef = await addDoc(collection(db, "orders"), orderDetail);
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        throw err;
    }
};

export const getOrderFromFirestore = async (orderId: string) => {
    try {
        const q = query(collection(db, "orders"), where("orderId", "==", orderId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const orderData = querySnapshot.docs[0].data();
            // Convert Firestore timestamp to Date object
            orderData.pickupDate = orderData.pickupDate.toDate();
            orderData.orderDate = orderData.orderDate.toDate();
            return JSON.parse(JSON.stringify({
                ...orderData,
                pickupDate: orderData.pickupDate.toISOString(),
                orderDate: orderData.orderDate.toISOString(),
                orders: orderData.orders.map(item => ({
                    ...item,
                    price: item.price.toString()
                }))
            }));
        } else {
            throw new Error("No such document!");
        }
    } catch (err) {
        throw err;
    }
};

// Removed export of app and db