import db from "../shared/db";

export const createOrder = async (authUserId, orderData) => {
    const { total_amount } = orderData;

    const result = await db.query(
        `
        INSERT INTO orders (auth_user_id, total_amount, status)
        VALUES ($1, $2, 'CREATED')
        RETURNING *
        `,
        [ authUserId, total_amount ]
    );

    return result.rows[0];
};

export const getMyOrders = async (authUserId) => {
     const result = await pool.query(
        `SELECT * FROM orders WHERE auth_user_id = $1 ORDER BY created_at DESC`,
        [ authUserId ]
    );

    return result.rows;
};

export const getOrderById = async (orderId, authUserId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE id = $1 AND auth_user_id = $2
        `,
        [ orderId, authUserId ]
    );

    if (!result.rows.length) {
        const err = new Error('Order not found');
        err.statusCode = 404;
        throw err;
    }

    return result.rows[0];
};