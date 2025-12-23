import express from 'express';
import * as orderController from './order.controller.js';
import { requireAuth } from '../auth/auth.middleware.js';
const orderRouter = express.Router();

orderRouter.post('/', requireAuth, orderController.createOrder);
orderRouter.get('/', requireAuth, orderController.getMyOrders);
orderRouter.get('/:id', requireAuth, orderController.getOrderById);

export default orderRouter;