// hooks/useOrder.js
import { useState } from 'react';
// import pool from '../lib/db';

export default function useOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const placeOrder = async (cake_id, quantity) => {
        setLoading(true);
        setError(null);

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO orders (cake_id, quantity, date) VALUES ($1, $2, NOW()) RETURNING *',
                [cake_id, quantity]
            );
            client.release();
            return result.rows[0];
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { placeOrder, loading, error };
}