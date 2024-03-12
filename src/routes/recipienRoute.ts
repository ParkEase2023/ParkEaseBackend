import express from 'express';
import { createRecipienOnDB, cronJobApproveRecipien, destroyRecipien, getAllRecipien, getRecipienOnDB } from '../controllers/recipienController';

const router = express.Router();


router.post('/createrecipienOnDB', createRecipienOnDB);
router.get('/getRecipienOnDB', getRecipienOnDB);
router.get('/getAllRecipien', getAllRecipien);
router.post('/destroyRecipien', destroyRecipien);


export default router;