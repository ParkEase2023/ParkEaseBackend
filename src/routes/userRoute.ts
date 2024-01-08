import express from 'express';
import {getProfile, updateUser} from '../controllers/userController';
import { authentication } from '../middleware/verifyHeader';
const router = express.Router();

router.use(authentication);
router.get('/getprofile',getProfile);
router.put('/updateprofile/:uid', updateUser);

export default router;