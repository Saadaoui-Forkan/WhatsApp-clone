import { Router } from 'express'
import { isAuth } from '../middlewares/auth';
import { updateProfile, updateProfilePhoto } from '../controllers/profile';
import { photoUpload } from '../middlewares/upload';

const profileRouter = Router()

profileRouter.put('/:id', isAuth, updateProfile)
profileRouter.put('/:id/profile-photo', isAuth, photoUpload.single('image'), updateProfilePhoto)

export default profileRouter;