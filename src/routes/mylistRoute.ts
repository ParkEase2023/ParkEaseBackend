import express from 'express';
import { addMyList } from '../controllers/mylistController';


const router = express.Router();
router.post('/addmylist', addMyList);


export default router;