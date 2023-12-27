import express from 'express';
import {getFormattedAddress} from '../controllers/parkingController'
const router = express.Router();

router.get('/formatlocation',getFormattedAddress)

export default router;