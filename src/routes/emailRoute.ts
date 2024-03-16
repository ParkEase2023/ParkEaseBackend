import express from 'express';
import {sendEmail, sendEmailNoti} from '../controllers/emailController'
import {sendEmailforfogetpassword} from '../controllers/emailController';
const router = express.Router();

router.get('/sendemail',sendEmail);
router.get('/sendemailtoforgotpw',sendEmailforfogetpassword);
router.post('/sendEmailNoti',sendEmailNoti);

export default router;