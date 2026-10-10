import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';
import { updateProfile, updateProfilePhoto } from '../controllers/profile.js';
import upload from '../middlewares/upload.js';
import { validate } from '../utils/validation.js';
import { idParamSchema, profileSchema } from '../utils/validationSchema.js';

const profileRouter = Router()

profileRouter.put('/:id', isAuth, validate(idParamSchema, 'params'), validate(profileSchema), updateProfile)
profileRouter.put('/:id/profile-photo', isAuth, validate(idParamSchema, 'params'), upload.single('image'), updateProfilePhoto)

export default profileRouter;