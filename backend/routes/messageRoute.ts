import { getConversationMessages, getConversations } from '../controllers/message.js';
import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';
import { validate } from '../utils/validation.js';
import { idParamSchema } from '../utils/validationSchema.js';

const messageRouter = Router()

messageRouter.get('/conversations', isAuth, getConversations)
messageRouter.get('/:userId', isAuth, validate(idParamSchema, 'params'), getConversationMessages)

export default messageRouter;
