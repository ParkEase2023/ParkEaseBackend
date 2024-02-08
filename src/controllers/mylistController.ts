import { Request, Response } from 'express';
import Mylist from '../models/Mylist';
import mongoose from 'mongoose';

export const addMyList = async (req: Request, res: Response) => {
    console.log('addMyList working');
    const body = req.body;
    await Mylist.create(body);
    res.status(201).json({
        message: 'addMylist successfully',
    });
};

export const getMyList = async (req: Request, res: Response) => {
    console.log('getMyList working');
    const query = req.query;
    console.log('getMyList: ', query.userId);
    const regexQuery = query.userId;
    console.log(regexQuery);
    try {
        if (query.userId !== '') {
            const regexQuery = query.userId;
            if (regexQuery) {
                console.log(regexQuery);
                const dataMyList: any = await Mylist.aggregate([
                    { $match: { userId: new mongoose.Types.ObjectId(regexQuery.toString()) } },                    
                        {
                        $lookup: {
                          from: "parkings",
                          localField: "parkingId",
                          foreignField: "_id",
                          as: "myList"
                        }
                        },
                      
                    { $sort: { createdAt: -1 } },
                ])
                if (dataMyList.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        myList: dataMyList,
                    });
                    console.log(dataMyList);
                } else {
                    console.log('No data');
                    res.status(200).json({
                        message: 'not success',
                        myList: dataMyList,
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

export const deleteMyList = async (req: Request, res: Response) => {
    // console.log(req.query._id)
    await Mylist.findByIdAndDelete(req.query._id)
        .then((data: any) => {
            // console.log(data);
            res.send(data);
        })
        .catch((err: any) => {
            console.log('error', err);
        });
};