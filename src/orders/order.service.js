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

export const getMyOrders = async (authUserId) => {};

export const getOrderById = async (orderId, authUserId) => {};