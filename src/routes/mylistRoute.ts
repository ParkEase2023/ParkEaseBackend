import express from 'express';
import { addMyList, getMyList } from '../controllers/mylistController';


const router = express.Router();
router.post('/addmylist', addMyList);
router.get('/getmylist', getMyList);


export default router;