import express from 'express';
import { logicController, registerController } from './auth.controller.js';
const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', logicController);

export default authRouter;