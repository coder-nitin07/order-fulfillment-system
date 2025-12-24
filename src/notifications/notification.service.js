
export const sendOrderPaidNotification = (orderId, userId) => {
  console.log(
    `[NOTIFICATION] Order ${orderId} paid successfully for user ${userId}`
  );
};

export const sendOrderShippedNotification = (orderId, userId) => {
  console.log(
    `[NOTIFICATION] Order ${orderId} shipped for user ${userId}`
  );
};

export const sendOrderDeliveredNotification = (orderId, userId) => {
  console.log(
    `[NOTIFICATION] Order ${orderId} delivered for user ${userId}`
  );
};