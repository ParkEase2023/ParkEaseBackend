import express from 'express';
import { addMyList, deleteMyList, getMyList } from '../controllers/mylistController';


const router = express.Router();
router.post('/addmylist', addMyList);
router.get('/getmylist', getMyList);
router.delete('/deletemylist', deleteMyList);


export default router;