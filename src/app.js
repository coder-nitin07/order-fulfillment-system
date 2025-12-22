import express from 'express';
import errorHandler from './shared/error.handler.js';
import authRouter from './auth/auth.routes.js';
const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRouter);

// error handler
app.use(errorHandler);

export default app;