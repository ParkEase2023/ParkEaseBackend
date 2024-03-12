import express from 'express';
import { createComment, getComment } from '../controllers/commentController';


const router = express.Router();


router.post('/createcomment', createComment);
router.get('/getcomment', getComment);

export default router;