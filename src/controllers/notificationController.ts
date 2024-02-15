import { Request, Response } from 'express';
import Notification from '../models/Notification';
import mongoose from 'mongoose';

export const createNotification = async (req: Request, res: Response) => {
    console.log('createNotification working');
    const body = req.body;
    try {
        await Notification.create(body);
        res.status(201).json({
            message: 'createNotification successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
