import express from 'express';
import { addCoins, withdrawMoney } from '../controllers/transactionController';

const router = express.Router();

router.put('/addcoins/:email',addCoins)
router.put('/withdrawMoney/:email',withdrawMoney)

export default router;