import express from 'express';
import {closeParking, createParking, deleteMyParking, getAllParking, getFormattedAddress, getMyparking, openParking} from '../controllers/parkingController'
const router = express.Router();

router.post('/createparking', createParking)
router.get('/getallparking',getAllParking)
router.get('/formatlocation',getFormattedAddress)
router.get('/getMyparking',getMyparking)
router.delete('/deleteMyparking', deleteMyParking);
router.put('/openParking/:id', openParking);
router.put('/closeParking/:id', closeParking);


export default router;