import express from 'express';
import { createNotification, getNotification } from '../controllers/notificationController';

const router = express.Router();

router.post('/createnotification', createNotification);
router.get('/getnotification', getNotification);



export default router;