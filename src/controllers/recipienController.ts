import { Request, Response } from 'express';
import Recipien from '../models/Recipien';
import mongoose from 'mongoose';
import { Recipient, deleteRecipient } from './omiseController';
import { sendEmailApproveRecipien } from './emailController';
import { destroyAccountLinked } from './userController';

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
                    { $match: { userId: new mongoose.Types.ObjectId(regexQuery.toString()) } },
                ]);
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

export const getAllRecipien = async (req: Request, res: Response) => {
    console.log('getAllRecipien working!');
    const data = await Recipien.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const cronJobApproveRecipien = async (req: any) => {
    console.log('cronJobApproveRecipien working!');
    const body = req;
    body.map((item: any) => {
        if (item.approve_status === false) {
            Recipient(item.recipienId, item.email);
        }
    });
};

export const approveRecipien = async (RecipienId: any, email: string) => {
    try {
        await Recipien.findOneAndUpdate(
            { recipienId: RecipienId },
            {
                approve_status: true,
            }
        )
            .then((data) => {
                console.log('success');
                sendEmailApproveRecipien(email);
            })
            .catch((err) => {
                console.log('error', err);
            });
    } catch (error) {
        console.log('error', error);
    }
};

export const destroyRecipien = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        deleteRecipient(body.recipienId);
        deteleRecipienOnDB(body.recipienId);
        destroyAccountLinked(body.userId);
        res.status(201).json({
            message:"success"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const deteleRecipienOnDB = async (recipienId:string) => {
    await Recipien.findOneAndDelete({recipienId:recipienId})
        .then((data: any) => {
            console.log(data);
        })
        .catch((err: any) => {
            console.log('error', err);
        });
}

