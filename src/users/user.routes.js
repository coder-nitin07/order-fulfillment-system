import express from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { createProfileController, getProfileController, updateProfileController } from './user.controller';
const userRouter = express.Router();

userRouter.post('/profile', authMiddleware, createProfileController);
userRouter.get('/profile', authMiddleware, getProfileController);
userRouter.put('/profile', authMiddleware, updateProfileController);

export default userRouter;