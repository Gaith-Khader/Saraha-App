import { Router } from 'express';
import * as MessageController from './controller/Message.controller.js'
import { asyncHandler } from "../../Services/errorHandling.js";
import { auth } from '../../Middleware/auth.middleware.js';
const router = Router();

router.post('/:receiverId', MessageController.sendMessage);
router.get('/',auth,MessageController.getMessage);
router.delete('/:messageId',auth,MessageController.deleteMessage);

export default router;