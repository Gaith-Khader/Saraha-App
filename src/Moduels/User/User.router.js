import { Router } from 'express';
import * as UserController from './controller/User.controller.js'
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { HME } from '../../Services/multer.js';
import { auth } from '../../Middleware/auth.middleware.js'
const router = Router();

router.get('/',asyncHandler(UserController.getUser));
router.patch('/profilePic',auth,fileUpload().single('image'),HME,UserController.profilePic);

export default router;