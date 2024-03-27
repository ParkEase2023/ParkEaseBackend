import express from 'express';
import {checkemail, checkeOTP, forgetpassword} from '../controllers/forgetpasswordController'


const router = express.Router();
router.post('/checkemail', checkemail);
router.get('/checkeOTP', checkeOTP);
router.put('/forgetpassword/:email',forgetpassword)


export default router;