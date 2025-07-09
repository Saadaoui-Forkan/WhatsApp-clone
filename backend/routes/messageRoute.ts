import { getMessages } from '../controllers/message.js';
import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';

const messageRouter = Router()

messageRouter.get('/',isAuth, getMessages)

export default messageRouter;