import { Router } from 'express'
import { login, register, test } from '../controllers/user.controllers';
import { isAuth } from '../middlewares/auth';

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/me', isAuth, test)

export default userRouter;