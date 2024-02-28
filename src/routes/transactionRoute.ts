import express from 'express';
import { addCoins, createTransfersOnDB, getAllTransfersOnDB, withdrawMoney } from '../controllers/transactionController';

const router = express.Router();

router.put('/addcoins/:email',addCoins);
router.put('/withdrawMoney/:email',withdrawMoney);
router.post('/createTransfersOnDB',createTransfersOnDB);
router.get('/getAllTransfersOnDB',getAllTransfersOnDB);

export default router;