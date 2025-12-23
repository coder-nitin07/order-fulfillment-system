
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