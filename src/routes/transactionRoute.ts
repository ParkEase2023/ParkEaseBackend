import express from 'express';
import { addCoins, createTransfersOnDB, withdrawMoney } from '../controllers/transactionController';

const router = express.Router();

router.put('/addcoins/:email',addCoins)
router.put('/withdrawMoney/:email',withdrawMoney)
router.post('/createTransfersOnDB',createTransfersOnDB)

export default router;