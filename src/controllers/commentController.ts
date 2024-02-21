import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment';

export const createComment = async (req: Request, res: Response) => {
    console.log('createComment work!');
    const body = req.body;

    try {
        await Comment.create(body);
        res.status(201).json({
            message: 'created',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const getComment = async (req: Request, res: Response) => {
    console.log('getComment work!');
    const query = req.query;
    // console.log('getComment: ', query.toiletId);
    const regexQuery = query.parkingId;
    console.log(regexQuery);
    try {
        if (query.parkingId !== '') {
            const regexQuery = query.parkingId;
            if (regexQuery) {
                console.log(regexQuery);
                const dataComment: any = await Comment.aggregate([
                    { $match: { parkingId: new mongoose.Types.ObjectId(regexQuery.toString()) } },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'createBy',
                            foreignField: '_id',
                            as: 'result',
                        },
                    },
                    { $sort: { createdAt: -1 } },
                ]);
                if (dataComment.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        Comment: dataComment,
                    });
                    console.log(dataComment);
                } else {
                    console.log('No data');
                    res.status(400).json({ message: 'No results found' });
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
