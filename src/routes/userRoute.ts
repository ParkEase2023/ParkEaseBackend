import express from 'express';
import {accountLinked, getAllUser, getProfile, getProfileById, updateUser, verifyYourIdentity} from '../controllers/userController';
import { authentication } from '../middleware/verifyHeader';
const router = express.Router();

router.get('/getAllUser',getAllUser)
router.use(authentication);
router.get('/getprofile',getProfile);
router.post('/getProfileById',getProfileById);
router.put('/updateprofile/:uid', updateUser);
router.put('/verifyIdentity/:email',verifyYourIdentity)
router.put('/accountLinked/:email',accountLinked)

export default router;