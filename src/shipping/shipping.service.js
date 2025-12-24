import pool from '../shared/db.js';
import { sendOrderShippedNotification, sendOrderDeliveredNotification } from '../notifications/notification.service.js';

export const createShipment = async (orderId, authUserId) => {
  const res = await pool.query(
    `
        INSERT INTO shipments (order_id, auth_user_id, status)
        VALUES ($1, $2, 'CREATED')
        RETURNING *
    `,
    [ orderId, authUserId ]
  );
  return res.rows[0];
};

export const getShipmentByOrder = async (orderId, authUserId) => {
  const res = await pool.query(
    `
        SELECT * FROM shipments
        WHERE order_id = $1 AND auth_user_id = $2
    `,
    [ orderId, authUserId ]
  );
  return res.rows[0];
};

export const updateShipmentStatus = async (shipmentId, status) => {
  const res = await pool.query(
    `
        UPDATE shipments
        SET status = $1
        WHERE id = $2
        RETURNING *
    `,
    [ status, shipmentId ]
  );

  if (status === 'SHIPPED') {
    sendOrderShippedNotification(res.rows[0].order_id, res.rows[0].auth_user_id);
  }

  if (status === 'DELIVERED') {
    sendOrderDeliveredNotification(res.rows[0].order_id, res.rows[0].auth_user_id);
  }

  return res.rows[0];
};