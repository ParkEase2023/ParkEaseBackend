import express from 'express';
import {forgetpassword} from '../controllers/forgetpasswordController'


const router = express.Router();
router.get('/forgetpassword', forgetpassword);


export default router;