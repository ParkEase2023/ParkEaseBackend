import { Request, Response } from 'express';
import Booking from '../models/Booking';
import mongoose from 'mongoose';
import User from '../models/User';


export const createBooking = async (req: Request, res: Response) => {
    console.log('createBooking working');
    const body = req.body;
    await Booking.create(body);
    res.status(201).json({
        message: 'createBooking successfully',
    });
};

export const paymentBookingOwner = async (req: Request, res: Response) => {
    console.log('paymentBookingOwner working');
    try {
        const Email = req.params.email;
        const coins = req.body.coins;
        const addcoins = req.body.addcoins;
        let totalCoins = coins + addcoins;
        await User.findOneAndUpdate(
            { email: Email },
            {
                coins: totalCoins,
            }
        )
            .then((data) => {
                console.log(data);
                res.status(200).json({ data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
};

export const paymentBookingCustomer = async (req: Request, res: Response) => {
    console.log('paymentBookingCustomer working');
    try {
        const Email = req.params.email;
        const coins = req.body.coins;
        const withdrawmoney = req.body.withdrawmoney;
        let totalCoins = coins - withdrawmoney;
        await User.findOneAndUpdate(
            { email: Email },
            {
                coins: totalCoins,
            }
        )
            .then((data) => {
                console.log(data);
                res.status(200).json({ data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
};

export const getBooking = async (req: Request, res: Response) => {
    console.log('getBooking working');
    const query = req.query;
    console.log('getBooking: ', query.userId);
    const regexQuery = query.userId;
    console.log(regexQuery);
    try {
        if (query.userId !== '') {
            const regexQuery = query.userId;
            if (regexQuery) {
                console.log(regexQuery);
                const dataBooking: any = await Booking.aggregate([
                    { $match: { customerId: new mongoose.Types.ObjectId(regexQuery.toString()) } },                   
                    { $sort: { createdAt: -1 } },
                ])
                if (dataBooking.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        myBooking: dataBooking,
                    });
                    console.log(dataBooking);
                } else {
                    console.log('No data');
                    res.status(200).json({
                        message: 'not success',
                        myNotification: dataBooking,
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