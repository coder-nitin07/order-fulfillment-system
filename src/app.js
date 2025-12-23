import express from 'express';
import errorHandler from './shared/error.handler.js';
import authRouter from './auth/auth.routes.js';
import userRouter from './users/user.routes.js';
import orderRouter from './orders/order.routes.js';
const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// error handler
app.use(errorHandler);

export default app;