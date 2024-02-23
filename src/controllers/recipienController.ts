import { Request, Response } from 'express';
import Recipien from '../models/Recipien';

export const createRecipienOnDB = async (req: Request, res: Response) => {
    console.log('createRecipienOnDB work!');
    const body = req.body;
    try {
        await Recipien.create(body);
        res.status(201).json({
            message: 'created',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};


