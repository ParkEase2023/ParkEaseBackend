import express from 'express';
import { generateOTP } from '../controllers/otpController';


const router = express.Router();

router.get('/generateOTP', generateOTP);



export default router;