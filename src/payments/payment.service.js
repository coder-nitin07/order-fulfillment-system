import pool from "../shared/db.js";
import { markOrderAsPaid } from '../orders/order.service.js';
import { sendOrderPaidNotification } from '../notifications/notification.service.js';

export const initiatePayment = async (authUserId, orderId, amount) => {
    const result = await pool.query(
        `
            INSERT INTO payments (order_id, auth_user_id, amount, status)
            VALUES ($1, $2, $3, 'INITIATED')
            RETURNING *
        `,
        [ orderId, authUserId, amount ]
    );

  return result.rows[0];
};

export const getPaymentsByOrder = async (authUserId, orderId) => {
     const result = await pool.query(
        `
            SELECT *
            FROM payments
            WHERE order_id = $1 AND auth_user_id = $2
            ORDER BY created_at DESC
        `,
        [ orderId, authUserId ]
    );

    return result.rows;
};

export const updatePaymentStatus = async (paymentId,authUserId, status) =>{
    const result = await pool.query(
        `
            UPDATE payments
            SET status = $1
            WHERE id = $2 AND auth_user_id = $3
            RETURNING *
        `,
        [ status, paymentId, authUserId ]
    );

    if(!result.rows.length){
        const err = new Error('Payment not found');
        err.statusCode = 404;
        throw err;
    }

    const payment = result.rows[0];

    // Coordination happens here
    if (status === 'SUCCESS') {
        await markOrderAsPaid(payment.order_id);
        sendOrderPaidNotification(payment.order_id, authUserId);
    }

    return result.rows[0];
};