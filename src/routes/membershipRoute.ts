import express from 'express';
import { applyMember, applyPartner } from '../controllers/membershipController';


const router = express.Router();

router.put('/applyMember/:email',applyMember);
router.put('/applyPartner/:email',applyPartner);


export default router;