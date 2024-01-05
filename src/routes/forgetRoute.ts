import express from 'express';
import {checkemail, forgetpassword} from '../controllers/forgetpasswordController'


const router = express.Router();
router.get('/checkemail', checkemail);
router.get('/forgetpassword', forgetpassword);


export default router;