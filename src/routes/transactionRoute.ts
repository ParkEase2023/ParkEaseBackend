import express from 'express';
import { addCoins } from '../controllers/transactionController';

const router = express.Router();

router.put('/addcoins/:email',addCoins)

export default router;