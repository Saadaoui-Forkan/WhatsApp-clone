import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';
import { updateProfile, updateProfilePhoto } from '../controllers/profile.js';
import upload from '../middlewares/upload.js';

const profileRouter = Router()

profileRouter.put('/:id', isAuth, updateProfile)
profileRouter.put('/:id/profile-photo', isAuth, upload.single('image'), updateProfilePhoto)

export default profileRouter;