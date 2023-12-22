import express from 'express';
import { forgetpassword } from '../controllers/forgetpasswordController.js';

const app = express();

const router = express.Router();

router.post('/forgetpassword', forgetpassword);


export default router;