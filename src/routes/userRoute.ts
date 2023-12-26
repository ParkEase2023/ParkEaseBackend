import express from 'express';
import {getProfile} from '../controllers/userController';
import { authentication } from '../middleware/verifyHeader';
const router = express.Router();

router.use(authentication);
router.get('/getprofile',getProfile);

export default router;