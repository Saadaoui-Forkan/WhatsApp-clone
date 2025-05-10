import { Router, RequestHandler } from 'express'
import { login, register } from '../controllers/user.controllers';

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter;