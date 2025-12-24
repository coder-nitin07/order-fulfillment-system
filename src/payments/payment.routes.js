import express from 'express';
import * as paymentController from './payment.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
const paymentRouter = express.Router();

paymentRouter.post('/', authMiddleware, paymentController.initiatePayment);
paymentRouter.get('/:orderId', authMiddleware, paymentController.getPaymentsByOrder);
paymentRouter.patch('/:id/status', authMiddleware, paymentController.updatePaymentStatus);

export default paymentRouter;