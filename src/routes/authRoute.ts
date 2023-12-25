import express from 'express';
import { generateOTP } from '../controllers/otpController';
import {signup} from '../controllers/authController';
const router = express.Router();

router.post('/signup' , signup);
router.get('/generateOTP', generateOTP);


export default router;