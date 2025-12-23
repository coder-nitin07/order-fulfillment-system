import * as orderService from './order.service.js';

export const createOrder = async (req, res, next) => {
  try {
    const authUserId = req.user.id;
    const order = await orderService.createOrder(authUserId, req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const authUserId = req.user.id;
    const orders = await orderService.getMyOrders(authUserId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const authUserId = req.user.id;
    const order = await orderService.getOrderById(
      req.params.id,
      authUserId
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};