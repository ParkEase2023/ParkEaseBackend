import express from 'express';
import { createRecipienOnDB, cronJobApproveRecipien, getAllRecipien, getRecipienOnDB } from '../controllers/recipienController';

const router = express.Router();


router.post('/createrecipienOnDB', createRecipienOnDB);
router.get('/getRecipienOnDB', getRecipienOnDB);
router.get('/getAllRecipien', getAllRecipien);


export default router;