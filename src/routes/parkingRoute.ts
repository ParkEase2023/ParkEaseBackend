import express from 'express';
import {createParking, getAllParking, getFormattedAddress, getMyparking} from '../controllers/parkingController'
const router = express.Router();
router.post('/createparking', createParking)
router.get('/getallparking',getAllParking)
router.get('/formatlocation',getFormattedAddress)
router.get('/getMyparking',getMyparking)

export default router;