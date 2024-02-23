import express from 'express';
import { createRecipienOnDB } from '../controllers/recipienController';

const router = express.Router();


router.post('/createrecipienOnDB', createRecipienOnDB);

export default router;