import { Request, Response } from 'express';
import Recipien from '../models/Recipien';
import mongoose from 'mongoose';

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



export const getRecipienOnDB = async (req: Request, res: Response) => {
    console.log('getRecipienOnDB working');
    const query = req.query;
    console.log('getRecipienOnDB: ', query.userId);
    try {
        if (query.userId !== '') {
            const regexQuery = query.userId;
            if (regexQuery) {
                const dataRecipienOnDB: any = await Recipien.aggregate([
                    { $match: { userId: new mongoose.Types.ObjectId(regexQuery.toString()) } }
                ])
                if (dataRecipienOnDB) {
                    res.status(200).json({
                        message: 'success',
                        myData: dataRecipienOnDB,
                    });
                    // console.log(dataRecipienOnDB);
                } else {
                    console.log('No data');
                    res.status(200).json({
                        message: 'not success',
                        myData: dataRecipienOnDB,
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