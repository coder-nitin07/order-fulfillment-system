import express from 'express';
import * as paymentController from './payment.controller.js';
import { requireAuth } from '../auth/auth.middleware.js';
const paymentRouter = express.Router();

paymentRouter.post('/', requireAuth, paymentController.initiatePayment);
paymentRouter.get('/:orderId', requireAuth, paymentController.getPaymentsByOrder);

export default paymentRouter;