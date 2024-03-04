import express from 'express';
import { applyMember, applyPartner, cancelMembership } from '../controllers/membershipController';


const router = express.Router();

router.put('/applyMember/:email',applyMember);
router.put('/applyPartner/:email',applyPartner);
router.put('/cancelMembership/:email',cancelMembership);


export default router;