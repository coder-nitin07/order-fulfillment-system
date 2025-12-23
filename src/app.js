import express from 'express';
import errorHandler from './shared/error.handler.js';
import authRouter from './auth/auth.routes.js';
import userRouter from './users/user.routes.js';
import orderRouter from './orders/order.routes.js';
import paymentRouter from './payments/payment.routes.js';
const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymentRouter);

// error handler
app.use(errorHandler);

export default app;