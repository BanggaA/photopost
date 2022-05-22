import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authMw } from '../middlewares/auth.middleware';

export const userRoutes = Router();

userRoutes.get('/me', authMw, userController.getMyProfile);
userRoutes.get('/:userId', userController.getProfileId);
