import express from 'express';
import { generateOTP } from '../controllers/otpController';
import { forgetpassword } from '../controllers/forgetpasswordController';

const app = express();

const router = express.Router();

router.get('/generateOTP', generateOTP);
router.post('/forgetpassword', forgetpassword);


export default router;