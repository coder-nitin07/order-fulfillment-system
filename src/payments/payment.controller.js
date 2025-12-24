import * as paymentService from './payment.service.js';

export const initiatePayment = async (req, res, next) => {
  try {
    const authUserId = req.user.userId;
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
    console.log(payments, "s");
  } catch (err) {
    next(err);
  }
};

export const updatePaymentStatus = async (req, res, next) =>{
  try {
    const authUserId = req.user.userId;
    const { status } = req.body;

    const payment = await paymentService.updatePaymentStatus(
      req.params.id,
      authUserId,
      status
    );

    res.json(payment);
  } catch (err) {
    next(err);
  }
};