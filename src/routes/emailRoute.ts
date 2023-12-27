import express from 'express';
import {sendEmail} from '../controllers/emailController'
import {sendEmailforfogetpassword} from '../controllers/emailController';
const router = express.Router();

router.get('/sendemail',sendEmail);
router.get('/sendemailtoforgotpw',sendEmailforfogetpassword);

export default router;