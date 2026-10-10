import { Router } from 'express'
import { getFriends, login, logout, register, test, verifyAccount } from '../controllers/user.js';
import { isAuth } from '../middlewares/auth.js';
import { authLimiter } from './rateLimiters.js';
import { validate } from '../utils/validation.js';
import { loginSchema, registerSchema, verifyParamsSchema } from '../utils/validationSchema.js';

const userRouter = Router()

userRouter.post('/register', authLimiter, validate(registerSchema), register)
userRouter.post('/login', authLimiter, validate(loginSchema), login)
userRouter.get('/me', isAuth, test)
userRouter.post('/logout', isAuth, logout)
userRouter.get('/friends', isAuth, getFriends)
userRouter.get('/:userId/verify/:token', validate(verifyParamsSchema, 'params'), verifyAccount)

export default userRouter;