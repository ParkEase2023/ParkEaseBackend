import express from 'express';
import {createdPromptPayQRCode} from '../controllers/omiseController';
import {CheckCharge} from '../controllers/omiseController'
import {Recipient} from '../controllers/omiseController';
import {Transfers} from '../controllers/omiseController';
const router = express.Router();
router.post('/created', createdPromptPayQRCode);
router.get('/check',CheckCharge)
router.get('/recipient',Recipient)
router.get('/transfers',Transfers)



export default router;