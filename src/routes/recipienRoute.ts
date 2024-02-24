import express from 'express';
import { createRecipienOnDB, getRecipienOnDB } from '../controllers/recipienController';

const router = express.Router();


router.post('/createrecipienOnDB', createRecipienOnDB);
router.get('/getRecipienOnDB', getRecipienOnDB);

export default router;