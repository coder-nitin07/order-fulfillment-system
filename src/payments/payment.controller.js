import * as paymentService from './payment.service.js';

export const initiatePayment = async (req, res, next) => {
  try {
    const authUserId = req.user.id;
    const { orderId, amount } = req.body;

    const payment = await paymentService.initiatePayment(
      authUserId,
      orderId,
      amount
    );

    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

export const getPaymentsByOrder = async (req, res, next) => {
  try {
    const authUserId = req.user.id;
    const { orderId } = req.params;

    const payments = await paymentService.getPaymentsByOrder(
      authUserId,
      orderId
    );

    res.json(payments);
  } catch (err) {
    next(err);
  }
};