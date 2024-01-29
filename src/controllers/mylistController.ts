import { Request, Response } from 'express';
import Mylist from '../models/Mylist';

export const addMyList = async (req: Request, res: Response) => {
    console.log('addMyList working');
    const body = req.body;
    await Mylist.create(body);
    res.status(201).json({
        message: 'addMylist successfully',
    });
};
