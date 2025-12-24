import express from 'express';
const shippingRouter = express.Router();
import { authMiddleware } from '../auth/auth.middleware.js';
import * as c from './shipping.controller.js';

shippingRouter.post('/', authMiddleware, c.createShipment);
shippingRouter.get('/order/:orderId', authMiddleware, c.getShipmentByOrder);
shippingRouter.patch('/:id/status', authMiddleware, c.updateShipmentStatus);

export default shippingRouter;