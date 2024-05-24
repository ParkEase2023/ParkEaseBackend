import express from 'express';
import { createBooking, getBooking, paymentBookingCustomer, paymentBookingOwner } from '../controllers/bookingController';


const router = express.Router();

router.post('/createBooking' , createBooking);
router.put('/paymentBookingOwner/:email',paymentBookingOwner);
router.put('/paymentBookingCustomer/:email',paymentBookingCustomer);
router.get('/getBooking', getBooking);


export default router;