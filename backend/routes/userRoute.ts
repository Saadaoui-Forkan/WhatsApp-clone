import { Router } from 'express'
import { getFriends, login, logout, register, test, verifyAccount } from '../controllers/user';
import { isAuth } from '../middlewares/auth';

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/me', isAuth, test)
userRouter.post('/logout', isAuth, logout)
userRouter.get('/:userId/verify/:token', verifyAccount)
userRouter.get('/friends', isAuth, getFriends)

export default userRouter;