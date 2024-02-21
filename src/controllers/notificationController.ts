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

export const getNotification = async (req: Request, res: Response) => {
    console.log('getNotification working');
    const query = req.query;
    console.log('getNotification: ', query.userId);
    const regexQuery = query.userId;
    console.log(regexQuery);
    try {
        if (query.userId !== '') {
            const regexQuery = query.userId;
            if (regexQuery) {
                console.log(regexQuery);
                const dataNotification: any = await Notification.aggregate([
                    { $match: { userId: new mongoose.Types.ObjectId(regexQuery.toString()) } },                   
                    { $sort: { createdAt: -1 } },
                ])
                if (dataNotification.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        myNotification: dataNotification,
                    });
                    console.log(dataNotification);
                } else {
                    console.log('No data');
                    res.status(200).json({
                        message: 'not success',
                        myNotification: dataNotification,
                    });
                }
            } else {
                console.log('regexQuery is undefined');
                res.status(400).json({ message: 'Invalid query' });
            }
        } else {
            console.log('No search');
            res.status(400).json({ message: 'Please enter place name' });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};
