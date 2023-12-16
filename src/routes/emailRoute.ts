import express from 'express';
import {sendEmail} from '../controllers/emailController'
const router = express.Router();

router.get('/sendemail',sendEmail)


export default router;