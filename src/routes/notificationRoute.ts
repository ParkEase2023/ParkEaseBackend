import express from 'express';
import { createNotification } from '../controllers/notificationController';

const router = express.Router();

router.post('/createnotification', createNotification);



export default router;