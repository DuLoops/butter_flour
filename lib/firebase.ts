'use server'
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { format } from "date-fns"

import {OrderDetails, OrderItem} from '@/types/Order';
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
                orders: orderData.orders.map((item: OrderItem) => ({
                    ...item,
                    price: item.price.toString()
                }))
            }));
        } else {
            return null; // Return null if no document is found
        }
    } catch (err) {
        throw err;
    }
};


export const sendEmailToAdmin = async (orderDetail: any) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Recieved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #000;
            line-height: 1.6;
        }
        .order-details {
            margin-top: 20px;
        }
        .order-details th, .order-details td {
            border: 1px solid #dddddd;
            text-align: left;
        }
        .order-details th {
            background-color: #f4f4f4;
        }
        .footer {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #dddddd;
            color: #666666;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .order-info{
            margin-top: 10px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Order Recieved</h1>
            <p>Thank you for your order, ${orderDetail.cutomerName}! We are pleased to receive your order and will confirm it shortly. Below are the details of your order:</p>
            <div class="order-details">
                <table width="100%">
                    <tr>
                        <th>Item</th>
                        <th>Details</th>
                    </tr>
                    ${orderDetail.orders.map((item:any) => 
                        (`<tr>
                            <td>${item.cake_name}</td>
                            <td>
                                <ul>
                                    <li>Quantity: ${item.quantity}</li>
                                    <li>Size: ${item.size}</li>
                                    ${item.isGlutenFree ? '<li>Option: Gluten free</li>' : ''}
                                    <li>Price: $${item.price.toFixed(2)}</li>
                                </ul>
                            </td>
                        </tr>`
                    ))}
                    ${orderDetail.deliveryOption === 'delivery' ? `
                    <tr>
                        <td style="text-align: right;">Delivery Fee</td>
                        <td>$${orderDetail.deliveryFee.toFixed(2)}</td>
                    </tr>` : ''}
                    <tr>
                        <td style="text-align: right;"><strong>Total</strong></td>
                        <td style="text-align: right;"><strong>$${orderDetail.totalPrice.toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>
            <div class="order-info">
                <p><strong>Order Method:</strong> ${orderDetail.order_method}</p>
                <p><strong>Date:</strong> ${format(orderDetail.pickupDate,"PPP")}</p>
                <p><strong>Time:</strong> ${orderDetail.time}</p>
                ${orderDetail.order_method === 'Delivery' ? `
                <p><strong>Delivery Address:</strong> ${orderDetail.deliveryAddress}</p>`: ''}
            </div>
            <p>If you have any questions or need further assistance, please feel free to contact us at <a href="mailto:butterflourcake@gmail.com">butterflourcake@gmail.com</a>.</p>
            <p>Thank you for ordering our cake!</p>
            <p>Best regards,<br>ButterFlour Cakeshop</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ButterFlour</p>
            <p><a href="https://butterflour.ca">Visit our website</a></p>
            <p><a href="https://www.instagram.com/butterflourvictoria/">Visit our Intagram</a></p>
        </div>
    </div>
</body>
</html>`;
    try {
        // Send email to admin
        await addDoc(collection(db, "emails"), {
            to: [orderDetail.customerEmail],
            message: {
                subject: `New Order Received - ${orderDetail.orderId}`,
                text: `A new order has been received with order ID: ${orderDetail.orderId}. Please check the admin panel for more details.`,
                html: html
            }
        });
        
    } catch (err) {
        throw err;
    }
}
// Removed export of app and db