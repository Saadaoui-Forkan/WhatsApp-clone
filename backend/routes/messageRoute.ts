import { getConversationMessages, getConversations } from '../controllers/message.js';
import { uploadAttachment } from '../controllers/messageAttachment.js';
import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';
import { validate } from '../utils/validation.js';
import { idParamSchema } from '../utils/validationSchema.js';
import upload from '../middlewares/upload.js';

const messageRouter = Router()

messageRouter.get('/conversations', isAuth, getConversations)
messageRouter.get('/:userId', isAuth, validate(idParamSchema, 'params'), getConversationMessages)
messageRouter.post('/attachment', isAuth, upload.single('image'), uploadAttachment)

export default messageRouter;
