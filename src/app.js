import express from 'express';
import errorHandler from './shared/error.handler.js';
const app = express();

app.use(express.json());

app.use(errorHandler);

export default app;