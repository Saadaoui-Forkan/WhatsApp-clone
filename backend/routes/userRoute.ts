import { Router } from 'express'
import { login, logout, register, test } from '../controllers/user';
import { isAuth } from '../middlewares/auth';

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/me', isAuth, test)
userRouter.post('/logout', isAuth, logout)

export default userRouter;