import { Router } from 'express'
import { getFriends, login, logout, register, test, verifyAccount } from '../controllers/user.js';
import { isAuth } from '../middlewares/auth.js';
import { authLimiter } from './rateLimiters.js';

const userRouter = Router()

userRouter.post('/register', authLimiter, register)
userRouter.post('/login', authLimiter, login)
userRouter.get('/me', isAuth, test)
userRouter.post('/logout', isAuth, logout)
userRouter.get('/friends', isAuth, getFriends)
userRouter.get('/:userId/verify/:token', verifyAccount)

export default userRouter;