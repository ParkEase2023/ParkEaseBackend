import express from 'express';
import {createdPromptPayQRCode, createdRecipient} from '../controllers/omiseController';
import {CheckCharge} from '../controllers/omiseController'
import {Transfers} from '../controllers/omiseController';
const router = express.Router();
router.post('/created', createdPromptPayQRCode);
router.post('/check',CheckCharge);
router.post('/createrecipient',createdRecipient);



export default router;