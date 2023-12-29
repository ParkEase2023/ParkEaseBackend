import express from 'express';
import {createParking, getFormattedAddress} from '../controllers/parkingController'
const router = express.Router();
router.post('/createparking', createParking)
router.get('/formatlocation',getFormattedAddress)

export default router;