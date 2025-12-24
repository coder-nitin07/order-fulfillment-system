import express from 'express';
import * as orderController from './order.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
const orderRouter = express.Router();

orderRouter.post('/', authMiddleware, orderController.createOrder);
orderRouter.get('/', authMiddleware, orderController.getMyOrders);
orderRouter.get('/:id', authMiddleware, orderController.getOrderById);

export default orderRouter;