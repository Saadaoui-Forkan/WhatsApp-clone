import { getMessages } from 'controllers/message';
import { Router } from 'express'
import { isAuth } from 'middlewares/auth';

const messageRouter = Router()

messageRouter.get('/',isAuth, getMessages)

export default messageRouter;