import express from 'express';
import {createParking, getAllParking, getFormattedAddress} from '../controllers/parkingController'
const router = express.Router();
router.post('/createparking', createParking)
router.get('/getallparking',getAllParking)
router.get('/formatlocation',getFormattedAddress)

export default router;